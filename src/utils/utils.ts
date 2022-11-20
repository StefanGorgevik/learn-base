export const getIdFromName = (name: string) =>
  name.substring(name.lastIndexOf("/") + 1);
