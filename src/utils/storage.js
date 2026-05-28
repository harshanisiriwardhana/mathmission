const KEY_PREFIX = 'MM_';

export function saveProgress(accessKey, data) {
  localStorage.setItem(KEY_PREFIX + accessKey, JSON.stringify(data));
}

export function loadProgress(accessKey) {
  const data = localStorage.getItem(KEY_PREFIX + accessKey);
  return data ? JSON.parse(data) : null;
}

export function saveAccessKey(accessKey) {
  localStorage.setItem('MM_CURRENT_KEY', accessKey);
}

export function loadAccessKey() {
  return localStorage.getItem('MM_CURRENT_KEY');
}

export function saveChildName(name) {
  localStorage.setItem('MM_CHILD_NAME', name);
}

export function loadChildName() {
  return localStorage.getItem('MM_CHILD_NAME');
}

export function clearAll() {
  localStorage.clear();
}