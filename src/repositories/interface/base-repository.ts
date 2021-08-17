type EntityWithId = {
  id: any;
};

export interface IBaseRepository<T extends EntityWithId> {
  create(dto: any): Promise<T>;

  findAll(): Promise<T[]>;

  findOne(id: T['id']): Promise<T>;

  update(id: T['id'], dto: any): Promise<T>;

  remove(id: T['id']): Promise<void>;
}
