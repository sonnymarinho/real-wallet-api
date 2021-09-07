import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { User } from 'src/resources/users/entities/user.entity';

export class CreateTransactionDto {
  @IsNumber()
  value: number;

  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  user: User;
}
