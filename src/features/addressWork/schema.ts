import { z } from 'zod';

export const addressWorkSchema = z.object({
  workplace: z.string().min(1, 'Выберите место работы'),
  address: z
    .string()
    .min(1, 'Адрес обязателен для заполнения')
    .min(5, 'Адрес слишком короткий')
    .max(200, 'Адрес слишком длинный'),
});

export type AddressWorkValues = z.infer<typeof addressWorkSchema>;
