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

  return {
    body: sorted,
  };
}
