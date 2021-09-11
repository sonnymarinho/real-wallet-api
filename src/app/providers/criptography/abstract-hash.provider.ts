import { SALT_OR_ROUNDS } from '../../config/cryptography';

export type CompareHashParam = {
  password: string;
  hash: string;
};

export interface IHashProvider {
  generateHash(passowrd: string): Promise<string>;
  compareHash({ password, hash }: CompareHashParam): Promise<boolean>;
}

export abstract class AbstractHashProvider implements IHashProvider {
  protected saltOrRounds = SALT_OR_ROUNDS;

  abstract generateHash(passowrd: string): Promise<string>;

  abstract compareHash({ password, hash }: CompareHashParam): Promise<boolean>;
}
