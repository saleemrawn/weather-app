export function saveDataToStorage(key, value) {
  localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
}

export function getDataFromStorage(key) {
  return typeof localStorage.getItem(key) === "string"
    ? localStorage.getItem(key)
    : JSON.parse(localStorage.getItem(key));
}
