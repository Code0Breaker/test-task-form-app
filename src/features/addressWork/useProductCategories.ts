import { useEffect, useState } from 'react';
import { api } from '@/shared/api';
import { humanizeSlug } from '@/shared/format';
import type {
  ProductCategoriesState,
  ProductCategory,
  RawCategory,
} from './types';

const normalize = (raw: RawCategory): ProductCategory => {
  if (typeof raw === 'string') {
    return { slug: raw, name: humanizeSlug(raw) };
  }
  const slug = raw.slug ?? '';
  return { slug, name: raw.name ?? humanizeSlug(slug) };
};

let cache: ProductCategory[] | null = null;
let inflight: Promise<ProductCategory[]> | null = null;

const loadCategories = (): Promise<ProductCategory[]> => {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = api
    .get<RawCategory[]>('/products/categories')
    .then((response) => {
      cache = response.data.map(normalize);
      return cache;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
};

export function useProductCategories() {
  const [state, setState] = useState<ProductCategoriesState>(() => ({
    data: cache,
    error: null,
    loading: cache === null,
  }));
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (cache && reloadKey === 0) {
      setState({ data: cache, error: null, loading: false });
      return;
    }

    let alive = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    loadCategories()
      .then((data) => {
        if (alive) setState({ data, error: null, loading: false });
      })
      .catch((error: unknown) => {
        if (!alive) return;
        const err = error instanceof Error ? error : new Error('Не удалось загрузить категории');
        setState({ data: null, error: err, loading: false });
      });

    return () => {
      alive = false;
    };
  }, [reloadKey]);

  const refetch = () => {
    cache = null;
    setReloadKey((key) => key + 1);
  };

  return { ...state, refetch };
}
