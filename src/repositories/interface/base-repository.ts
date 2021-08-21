interface WithId {
  id?: string;
}
export interface IBaseRepository<T extends WithId> {
  create(dto: any): Promise<T>;

  findAll(): Promise<T[]>;

  findOne(id: T['id']): Promise<T>;

  update(id: T['id'], dto: any): Promise<T>;

  remove(id: T['id']): Promise<void>;
}
