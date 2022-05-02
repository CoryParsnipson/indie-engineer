export function slugify(s) {
  const MAX_LEN = 50;
  const SEPARATOR = '-';

  let slug = s.toLowerCase();
  slug = slug.replace(/\s+?/g, SEPARATOR);
  slug = slug.replace(new RegExp(`[^0-9a-z${SEPARATOR} ]+?`, "g"), '');

  return slug.substring(0, MAX_LEN).replace(/-$/g, '');
}
