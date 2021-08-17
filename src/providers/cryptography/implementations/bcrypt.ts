import * as bcrypt from 'bcrypt';
import {
  AbstractHashProvider,
  CompareHashParam,
} from '@providers/cryptography/abstract-hash-provider';

export class Bcrypt extends AbstractHashProvider {
  public async generateHash(passowrd: string): Promise<string> {
    const hash = await bcrypt.hash(passowrd, this.saltOrRounds);
    return hash;
  }

  public async compareHash({
    password,
    hash,
  }: CompareHashParam): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
