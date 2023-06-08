import { hashSync, compare } from 'bcrypt';

export const encPassword = (password: string) => {
  const pass = hashSync(password, 13);
  return pass;
};

export const validatorPassword = async (
  password: string,
  currentPass: string,
) => {
  const pass = await compare(password, currentPass);

  return pass;
};
