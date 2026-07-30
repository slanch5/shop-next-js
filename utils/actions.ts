"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  validatedInputsZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { object } from "zod";

async function getAuthUser() {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
}

const getAdmin = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER) redirect("/");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    redirect("/products");
  }

  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedInputs = validatedInputsZodSchema(productSchema, rawData);
    const validateFile = validatedInputsZodSchema(imageSchema, { image: file });

    const fullPath = await uploadImage(validateFile.image);

    await db.product.create({
      data: {
        ...validatedInputs,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdmin();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductsAction = async (prevState: {
  productId: string;
}) => {
  const { productId } = prevState;
  await getAdmin();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAminProductDetails = async (productId: string) => {
  await getAdmin();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  await getAdmin();

  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedInputs = validatedInputsZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedInputs,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);

    return { message: "Product update successfully" };
  } catch (error) {
    return renderError(error);
  }
};
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData,
) => {
  await getAuthUser();

  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldimageurl = formData.get("url") as string;
    const validatedFile = validatedInputsZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldimageurl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product update image successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};
