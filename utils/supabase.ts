import { createClient } from "@supabase/supabase-js";

const bucket = "image-bucket";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

export const uploadImage = async (image: File) => {
  // Замінюємо всі небезпечні символи на "_"
  const safeName = image.name.replace(/[^a-zA-Z0-9._-]/g, "_");

  // Додаємо timestamp, щоб назви не повторювалися
  const fileName = `${Date.now()}-${safeName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
};

export const deleteImage = async (url: string) => {
  const imageName = url.split("/").pop();

  if (!imageName) {
    throw new Error("Invalid URL");
  }

  const { error } = await supabase.storage.from(bucket).remove([imageName]);

  if (error) {
    throw new Error(error.message);
  }
};
