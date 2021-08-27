import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Expose()
@Entity({ name: 'users' })
export class UserEntity {
  constructor(props: Partial<UserEntity> = {}) {
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
