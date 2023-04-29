// * Update Or Set LC (Local-Storage)
const setLocalStorage = (LCname, data) => {
  localStorage.setItem(LCname, JSON.stringify(data));
  return data;
};
const getLocalStorage = (LCname) => {
  const data = JSON.parse(localStorage.getItem(LCname));
  return data;
};

export { setLocalStorage, getLocalStorage };
