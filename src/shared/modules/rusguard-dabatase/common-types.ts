export interface Sort<T> {
  field: keyof T;
  direction: 'ASC' | 'DESC';
}
