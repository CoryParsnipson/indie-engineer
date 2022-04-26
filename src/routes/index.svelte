<script context="module">
  export const load = async ({ fetch }) => {
    const postsResp = await fetch(`/api/posts.json`);
    const posts = await postsResp.json();
    return {
      props: {
        posts: posts,
      },
    };
  };
</script>

<script>
  import PostPreview from '$lib/components/PostPreview.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  export let posts = [];

  let meta_description = "This is a blog about eschewing the safety and routine of office work and trying to survive on the merit of one's own creations. Can an Engineer/Maker earn a living off of their own creations?"
</script>

<svelte:head>
  <title>Indie Engineer</title>
  <meta name="description" content="{meta_description}">
  <meta name="og:title" property="og:title" content="Indie Engineer">
  <meta name="og:description" property="og:description" content="{meta_description}">
  <meta name="og:type" property="og:type" content="website">
  <meta name="og:image" property="og:image" content="/indie-engineer-og-image.png">
  <meta name="twitter:card" property="twitter:card" content="{meta_description}">
</svelte:head>

<main class="mx-5 py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each posts as post}
      <PostPreview
        metadata = {post.meta}
        path = {post.path}
      />
   {/each}
  </div>

  <Pagination />
</main>
