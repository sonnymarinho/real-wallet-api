import { SALT_OR_ROUNDS } from '@root/config/cryptography';

export type CompareHashParam = {
  password: string;
  hash: string;
};

export abstract class AbstractHashProvider {
  protected saltOrRounds = SALT_OR_ROUNDS;

  abstract generateHash(passowrd: string): Promise<string>;

  abstract compareHash({ password, hash }: CompareHashParam): Promise<boolean>;
}
