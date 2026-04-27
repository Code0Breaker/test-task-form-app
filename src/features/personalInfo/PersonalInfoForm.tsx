import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PHONE_MASK, PHONE_PLACEHOLDER, ROUTES } from '@/shared/constants';
import { useWizard } from '@/shared/useWizard';
import {
  Button,
  Field,
  Input,
  MaskedInput,
  Select,
  StepShell,
} from '@/shared/ui';
import { personalInfoSchema, type PersonalInfoValues } from './schema';

export function PersonalInfoForm() {
  const navigate = useNavigate();
  const { draft, patch } = useWizard();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onTouched',
    defaultValues: {
      phone: draft.phone,
      firstName: draft.firstName,
      lastName: draft.lastName,
      gender: draft.gender === '' ? undefined : draft.gender,
    },
  });

  const onSubmit = handleSubmit((values) => {
    patch(values, 1);
    navigate(ROUTES.step2);
  });

  return (
    <StepShell
      step={1}
      total={3}
      title="Личные данные"
      subtitle="Расскажите немного о себе"
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <Field label="Телефон" error={errors.phone?.message}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedInput
                mask={PHONE_MASK}
                value={field.value ?? ''}
                onAccept={field.onChange}
                onBlur={field.onBlur}
                inputMode="tel"
                type="tel"
                placeholder={PHONE_PLACEHOLDER}
              />
            )}
          />
        </Field>

        <Field label="Имя" error={errors.firstName?.message}>
          <Input
            type="text"
            autoComplete="given-name"
            placeholder="Иван"
            {...register('firstName')}
          />
        </Field>

        <Field label="Фамилия" error={errors.lastName?.message}>
          <Input
            type="text"
            autoComplete="family-name"
            placeholder="Иванов"
            {...register('lastName')}
          />
        </Field>

        <Field label="Пол" error={errors.gender?.message}>
          <Select defaultValue={draft.gender} {...register('gender')}>
            <option value="" disabled hidden>
              Выберите пол
            </option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </Select>
        </Field>

        <Button type="submit" fullWidth className="mt-2">
          Далее
        </Button>
      </form>
    </StepShell>
  );
}
