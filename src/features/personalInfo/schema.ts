import { z } from 'zod';

const PHONE_PATTERN = /^0\d{3} \d{3} \d{3}$/;
const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s'-]*$/;

export const personalInfoSchema = z.object({
  phone: z
    .string()
    .min(1, 'Телефон обязателен для заполнения')
    .regex(PHONE_PATTERN, 'Введите телефон в формате 0XXX XXX XXX'),
  firstName: z
    .string()
    .min(1, 'Имя обязательно для заполнения')
    .max(60, 'Имя слишком длинное')
    .regex(NAME_PATTERN, 'Имя содержит недопустимые символы'),
  lastName: z
    .string()
    .min(1, 'Фамилия обязательна для заполнения')
    .max(60, 'Фамилия слишком длинная')
    .regex(NAME_PATTERN, 'Фамилия содержит недопустимые символы'),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Выберите пол' }),
  }),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
