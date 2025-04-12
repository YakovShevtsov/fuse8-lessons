import { z } from 'zod';

export const CreateArticleFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Минимальная длина названия - 1 символ')
    .max(100, 'Максимальная длина названия - 100 символов'),
  content: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('draft'),
    }),
    z.object({
      type: z.literal('published'),
      description: z
        .string()
        .min(10, 'Минимальная длина описания - 10 символов')
        .max(1000, 'Максимальная длина описания - 1000 символов'),
      isNew: z.boolean().default(false).optional(),
    }),
  ]),
});

export type CreateArticleForm = z.infer<typeof CreateArticleFormSchema>;
