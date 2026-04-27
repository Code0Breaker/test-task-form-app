export type ProductCategory = {
  slug: string;
  name: string;
};

export type RawCategory = string | { slug?: string; name?: string };

export type ProductCategoriesState = {
  data: ProductCategory[] | null;
  error: Error | null;
  loading: boolean;
};
