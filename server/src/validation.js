import { createSeed } from './seed.js';
const localAsset = /^\/(?:assets|media)\/[a-zA-Z0-9_./-]+$/;
export function safeUrl(value, { image = false } = {}) {
  if (value === '') return true;
  if (typeof value !== 'string' || value.length > 2048 || /[\\\u0000-\u0020<>"']/.test(value)) return false;
  if (image && localAsset.test(value) && !value.includes('..')) return true;
  if (!image && value.startsWith('/') && !value.startsWith('//') && !value.includes('..')) return true;
  if (!image && value === '#') return true;
  try { const url = new URL(value); return url.protocol === 'https:' || (!image && ['mailto:', 'tel:'].includes(url.protocol)); } catch { return false; }
}

export function validateContent(content, publish = false) {
  const errors = [];
  if (!content || typeof content !== 'object' || Array.isArray(content)) return ['Content must be an object'];
  const shape = (actual, expected, path) => {
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual)) { errors.push(`${path}: expected collection`); return; }
      if (expected.length) actual.forEach((item, index) => shape(item, expected[0], `${path}.${index}`));
    } else if (expected && typeof expected === 'object') {
      if (!actual || typeof actual !== 'object' || Array.isArray(actual)) { errors.push(`${path}: expected object`); return; }
      for (const [key, item] of Object.entries(expected)) {
        if (key === 'comparison') { if (actual[key] != null) shape(actual[key], item, `${path}.${key}`); }
        else if (['_key', 'heroAlt', 'hidden'].includes(key) && actual[key] === undefined) continue;
        else shape(actual[key], item, `${path}.${key}`);
      }
    } else if (expected !== null && typeof actual !== typeof expected) errors.push(`${path}: expected ${typeof expected}`);
  };
  shape(content, createSeed(), 'content');
  if (errors.length) return errors;
  const visit = (value, path = '') => {
    if (path.split('.').length > 15) { errors.push(`${path}: nesting limit exceeded`); return; }
    if (typeof value === 'string') {
      if (value.length > 20000) errors.push(`${path}: text exceeds 20,000 characters`);
      const key = path.split('.').at(-1);
      if (/(?:image|url|favicon)$/i.test(key) && !safeUrl(value, { image: /image|favicon/i.test(key) || (key === 'url' && /galleryImages|drawings|renders/.test(path)) })) errors.push(`${path}: unsafe URL`);
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => visit(item, `${path}.${i}`));
    } else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) {
        if (['__proto__', 'constructor', 'prototype'].includes(key)) errors.push(`${path}: forbidden key`);
        else visit(item, path ? `${path}.${key}` : key);
      }
    } else if (value !== null && !['number', 'boolean'].includes(typeof value)) errors.push(`${path}: unsupported value`);
  };
  visit(content);
  for (const key of ['studioInfo', 'constructionComparison', 'copy']) if (!content[key] || typeof content[key] !== 'object' || Array.isArray(content[key])) errors.push(`${key}: required object`);
  for (const key of ['projects', 'team', 'services', 'processSteps', 'categories']) if (!Array.isArray(content[key])) errors.push(`${key}: required collection`);
  const ids = new Set();
  for (const [index, project] of (content.projects || []).entries()) {
    if (!project || typeof project !== 'object') { errors.push(`Project ${index}: invalid`); continue; }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id || '')) errors.push(`Project ${index}: slug must use lowercase words and hyphens`);
    if (ids.has(project.id)) errors.push(`Duplicate project slug: ${project.id}`); ids.add(project.id);
    for (const key of ['galleryImages', 'drawings', 'renders', 'story']) if (!Array.isArray(project[key])) errors.push(`${project.id}.${key}: required collection`);
    if (publish && !project.title?.trim()) errors.push(`${project.id}: title required to publish`);
    if (project.comparison && (!project.comparison.beforeImage || !project.comparison.afterImage)) errors.push(`${project.id}: comparison needs both photographs, or remove it`);
  }
  if (publish && !content.studioInfo?.name?.trim()) errors.push('Studio name is required');
  if (!Number.isInteger(content.copy?.about?.visibleTeamCount) || content.copy.about.visibleTeamCount < 0) errors.push('Visible team count must be a non-negative integer');
  for (const id of content.copy?.home?.featuredIds || []) if (!ids.has(id)) errors.push(`Featured project does not exist: ${id}`);
  return errors;
}
