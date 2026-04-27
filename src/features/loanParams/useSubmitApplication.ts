import { useCallback, useState } from 'react';
import { api } from '@/shared/api';
import type { SubmitArgs, SubmitResponse } from './types';

export function useSubmitApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = useCallback(
    async ({ firstName, lastName }: SubmitArgs): Promise<SubmitResponse> => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.post<SubmitResponse>('/products/add', {
          title: `${firstName} ${lastName}`,
        });
        return data;
      } catch (cause) {
        const err =
          cause instanceof Error
            ? cause
            : new Error('Не удалось отправить заявку');
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { submit, loading, error };
}
