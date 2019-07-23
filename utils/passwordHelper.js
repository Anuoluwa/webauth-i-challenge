import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);

}
