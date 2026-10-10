// Live published content. Seed data is imported only by the backend.
export let studioInfo = {}, constructionComparison = {}, services = [], processSteps = [], team = [], projects = [], copy = {}, categories = [];
export let publicationVersion = null;
export const previewMode = new URLSearchParams(window.location.search).has('preview');
export const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export const plainText = value => { const element = document.createElement('textarea'); element.innerHTML = value || ''; return element.value; };
const safe = value => {
  if (typeof value === 'string') {
    if (previewMode && /^\/media\/[a-f0-9-]+\//.test(value)) value = value.replace('/media/', '/api/v1/admin/media-file/');
    return escapeText(value);
  }
  if (Array.isArray(value)) return value.map(safe);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, safe(item)]));
  return value;
};

export async function loadContent() {
  const response = await fetch(previewMode ? '/api/v1/admin/preview' : '/api/v1/public/site', { credentials: 'same-origin', cache: 'no-cache' });
  if (!response.ok) throw new Error(previewMode ? 'Sign in to the CMS before previewing a draft.' : 'The content service is unavailable. Please retry.');
  const result = await response.json(); const content = safe(result.content);
  ({ studioInfo, constructionComparison, services, processSteps, team, projects, copy, categories } = content);
  projects = projects.filter(project => !project.hidden); publicationVersion = result.version;
  return content;
}
export async function loadProject(id) {
  if (previewMode) return projects.find(project => project.id === id) || null;
  let response = await fetch(`/api/v1/public/projects/${encodeURIComponent(id)}`, { cache: 'no-cache' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('The project could not be loaded. Please retry.');
  let result = await response.json();
  if (publicationVersion !== result.version) {
    await loadContent();
    response = await fetch(`/api/v1/public/projects/${encodeURIComponent(id)}`, { cache: 'no-cache' });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('The project could not be loaded. Please retry.');
    result = await response.json();
    if (publicationVersion !== result.version) throw new Error('Content changed during navigation. Please retry.');
  }
  const project = safe(result.project); const index = projects.findIndex(item => item.id === id);
  if (index >= 0) projects[index] = project; else projects.push(project);
  return project;
}
