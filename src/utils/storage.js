const storage = window.localStorage;
const key = 'messages';

export function setItem(item) {
  storage.setItem(key, JSON.stringify(item));
}

export function getItem() {
  return JSON.parse(storage.getItem(key));
}
