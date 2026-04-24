export function withBase(path: string) {
  if (/^(https?:)?\/\//i.test(path) || /^(mailto|tel):/i.test(path)) return path;

  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (!base || base === '') return path;
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

