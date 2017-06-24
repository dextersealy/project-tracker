export const get = (key, defaultValue = {}) => {
  const item = localStorage.getItem(key);
  return (item && JSON.parse(item)) || defaultValue;
};

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
