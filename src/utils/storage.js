const storage = window.localStorage;

export function setItem(key, item) {
  storage.setItem(key, JSON.stringify(item));
}

export function getItem(key) {
  return JSON.parse(storage.getItem(key));
}
