export interface IBaseRepository<T, id> {
  create(dto: any): Promise<T>;

  findAll(): Promise<T[]>;

  findOne(id: id): Promise<T>;

  update(id: id, dto: any): Promise<T>;

  remove(id: id): Promise<void>;
}
