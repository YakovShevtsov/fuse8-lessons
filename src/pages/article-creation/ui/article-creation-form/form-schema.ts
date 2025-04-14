import { z } from 'zod';
import * as yup from 'yup';
import { ArticleType, CreateArticle } from '@entities/article/model/types';

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

export const CreateArticleFormSchemaYup: yup.ObjectSchema<CreateArticle> =
  yup.object({
    title: yup
      .string()
      .required('Название обязательно')
      .min(1, 'Минимальная длина названия - 1 символ')
      .max(100, 'Максимальная длина названия - 100 символов'),
    content: yup.object({
      type: yup.mixed<ArticleType>().required().oneOf(['draft', 'published']),
      description: yup
        .string()
        .max(1000, 'Максимальная длина описания - 1000 символов')
        .min(10, 'Минимальная длина описания - 10 символов')
        .required('Описание обязательно')
        .when('type', {
          is: 'draft',
          then: (schema) => schema.notRequired().strip(),
        }),
      isNew: yup
        .boolean()
        .optional()
        .default(false)
        .when('type', {
          is: 'draft',
          then: (schema) => schema.notRequired().strip(),
        }),
    }),
  });

// eslint-disable-next-line
export interface CreateArticleFormYup
  extends yup.InferType<typeof CreateArticleFormSchemaYup> {}
