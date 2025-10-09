import * as z from "zod";

export const storySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
  category: z.string().min(1, "Category is required"),
  tags: z
    .array(z.string())
    .min(1, "At least one tag must be selected")
    .max(5, "You can select up to 5 tags"),
//   image: z
//     .any()
//     .refine((file) => file instanceof File, "Picture is required")
//     .refine(
//       (file) => file && file.size <= 5 * 1024 * 1024,
//       "Max file size is 5MB"
//     )
//     .refine(
//       (file) =>
//         file &&
//         ["image/jpeg", "image/png", "image/gif"].includes(file.type),
//       "Only JPEG, PNG, and GIF formats are accepted"
//     ),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters long"),
});