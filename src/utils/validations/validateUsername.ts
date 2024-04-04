export const validateUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9_]{6,20}$/;

  return regex.test(username);
};
