export const trimRight = (text: string, char: string) => {
  if (text.endsWith(char)) {
    return text.slice(0, -1);
  }
  return text;
};
