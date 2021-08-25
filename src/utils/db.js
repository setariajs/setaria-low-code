const DRAWING_ID = 'idGlobal';

export function getIdGlobal() {
  const str = localStorage.getItem(DRAWING_ID);
  if (str) return parseInt(str, 10);
  return 100;
}

export function saveIdGlobal(id) {
  localStorage.setItem(DRAWING_ID, `${id}`);
}
