export function saveDataToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getDataFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
