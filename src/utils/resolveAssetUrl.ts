/**
 * Resolves static asset URLs safely for both root domains and
 * GitHub Pages repository subfolders (e.g., https://username.github.io/repo-name/).
 */
export function resolveAssetUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  // External URLs, data URIs, blob URLs, or already-relative './' paths
  if (
    /^(https?:\/\/|data:|blob:|\.\.?\/)/i.test(trimmed)
  ) {
    return trimmed;
  }

  // Convert leading-slash paths ('/photos/wedding.jpg') or bare paths ('photos/wedding.jpg')
  // to respect Vite's configured base URL (import.meta.env.BASE_URL)
  const cleanRelative = trimmed.replace(/^\/+/, '');
  const baseUrl = import.meta.env.BASE_URL || './';

  if (baseUrl === './' || baseUrl === '.') {
    return `./${cleanRelative}`;
  }

  return baseUrl.endsWith('/')
    ? `${baseUrl}${cleanRelative}`
    : `${baseUrl}/${cleanRelative}`;
}
