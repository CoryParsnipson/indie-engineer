import { env } from '$lib/util/env';

export const get = async ({ url }) => {
  const postFiles = Object.entries(import.meta.glob('../blog/*.md'));

  const posts = await Promise.all(
    postFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const filepath = path.slice(2, -3);

      return {
        meta: metadata,
        path: filepath,
      };
    })
  );

  const sorted = posts.sort((a,  b) => {
    return new Date(b.meta.date) - new Date(a.meta.date);
  });

  // handle pagination
  const page = parseInt(url.searchParams.get('p')) || 1;
  const page_size = parseInt(url.searchParams.get('size')) || env.var.VITE_INDEX_PAGINATION_SIZE || 1;
  const num_pages = Math.ceil(posts.length / page_size);

  const results = posts.slice((page - 1) * page_size, page * page_size);

  return {
    body: {
      posts: results,
      current_page: page,
      page_size: page_size,
      num_pages: num_pages,
    },
  };
}
