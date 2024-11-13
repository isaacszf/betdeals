export type PaginatedResource<T> = {
  items: T[];
  totalItems: number;
  page: number;
  size: number;
};
