import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { useWizard } from '@/shared/useWizard';
import { Button, Field, Input, Select, StepShell } from '@/shared/ui';
import { useProductCategories } from './useProductCategories';
import { addressWorkSchema, type AddressWorkValues } from './schema';

export function AddressWorkForm() {
  const navigate = useNavigate();
  const { draft, patch } = useWizard();
  const categories = useProductCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressWorkValues>({
    resolver: zodResolver(addressWorkSchema),
    mode: 'onTouched',
    defaultValues: {
      workplace: draft.workplace,
      address: draft.address,
    },
  });

  const onSubmit = handleSubmit((values) => {
    patch(values, 2);
    navigate(ROUTES.step3);
  });

  return (
    <StepShell
      step={2}
      total={3}
      title="Адрес и место работы"
      subtitle="Где вы живёте и работаете?"
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        {categories.error && (
          <div
            role="alert"
            className="flex items-center justify-between gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>Не удалось загрузить список профессий.</span>
            <button
              type="button"
              onClick={categories.refetch}
              className="font-semibold underline-offset-2 hover:underline"
            >
              Повторить
            </button>
          </div>
        )}

        <Field label="Место работы" error={errors.workplace?.message}>
          <Select
            disabled={categories.loading || Boolean(categories.error)}
            defaultValue={draft.workplace}
            {...register('workplace')}
          >
            <option value="" disabled hidden>
              {categories.loading ? 'Загрузка...' : 'Выберите место работы'}
            </option>
            {categories.data?.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Адрес проживания" error={errors.address?.message}>
          <Input
            type="text"
            autoComplete="street-address"
            placeholder="г. Киев, ул. Хрещатик, д. 1, кв. 10"
            {...register('address')}
          />
        </Field>

        <div className="mt-2 flex gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.step1)}
            className="flex-1"
          >
            Назад
          </Button>
          <Button type="submit" className="flex-1">
            Далее
          </Button>
        </div>
      </form>
    </StepShell>
  );
}
