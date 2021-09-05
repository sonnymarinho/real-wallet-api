import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';

@Expose()
@Entity({ name: 'users' })
export class User {
  constructor(props: Partial<User> = {}) {
    const id = uuidv4();
    Object.assign(this, { ...props, id });
  }

  @PrimaryColumn()
  id?: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string;
}
