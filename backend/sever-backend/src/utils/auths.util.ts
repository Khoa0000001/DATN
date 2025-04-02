import * as bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function isValidPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
