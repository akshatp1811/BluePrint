let csrf = '';
export const setSession = session => { csrf = session?.csrf || ''; };
export async function api(path, options = {}) {
  const response = await fetch(`/api/v1/admin${path}`, {
    credentials: 'same-origin', ...options,
    headers: { ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), 'X-CSRF-Token': csrf, ...options.headers },
    body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body
  });
  const result = await response.json();
  if (!response.ok) { const error = new Error([result.error, ...(result.details || [])].join('\n')); error.status = response.status; throw error; }
  return result;
}
export const previewImage = url => url?.startsWith('/media/') ? url.replace('/media/', '/api/v1/admin/media-file/') : url;
