import { hashSync, compare } from 'bcrypt';

export const encPassword = (password: string) => {
  const pass = hashSync(password, 13);
  return pass;
};

export const validatorPassword = (password: string, currentPass: string) => {
  const pass = compare(password, currentPass);

  return pass;
};
