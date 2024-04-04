export const validatePassword = (password: string) => {
  const regex = /^\S{6,128}$/;

  return regex.test(password);
};
