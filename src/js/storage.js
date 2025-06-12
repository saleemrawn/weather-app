export function saveDataToStorage(key, value) {
  localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
}

export function getDataFromStorage(key) {
  const value = localStorage.getItem(key);

  if (value !== null && value.substring(0, 1) === "{" && value.substring(value.length - 1, value.length) === "}") {
    return JSON.parse(value);
  }

  return value;
}
