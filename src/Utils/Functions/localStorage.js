export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const userInformation = () => {
  return getLocalStorage("user") ?? "";
};
