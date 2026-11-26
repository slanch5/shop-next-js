import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Назва має містити щонайменше 2 символи.",
    })
    .max(100, {
      message: "Назва має містити менше 100 символів.",
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  inStock: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: "Ціна має бути додатним числом.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Опис має містити від 10 до 1000 слів.",
    },
  ),
  category: z.enum(["whiskey", "vodka"], {
    message: "Будь ласка, оберіть коректну категорію",
  }),
});

export function validatedInputsZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown,
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "Розмір файлу має бути менше 1 МБ")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "Файл має бути зображенням");
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "ID товару не може бути порожнім",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Ім’я автора не може бути порожнім",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "URL зображення автора не може бути порожнім",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Оцінка має бути не менше 1" })
    .max(5, { message: "Оцінка має бути не більше 5" }),
  comment: z
    .string()
    .min(10, { message: "Коментар має містити щонайменше 10 символів" })
    .max(1000, { message: "Коментар має містити не більше 1000 символів" }),
});
