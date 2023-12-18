export const generateId = ({ name }) => {
  const randomNumber = Math.random().toString(36).substr(2, 9);
  const dateTime = new Date().getTime();
  const randomId = `${name}_${randomNumber}_${dateTime}`;

  return randomId;
};
