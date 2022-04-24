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

<main>
  <h1 class="mb-6">Recent posts</h1>

  {#each posts as post}
    <PostPreview
      metadata = {post.meta}
      path = {post.path}
    />
  {/each}
</main>

<style>
  h1 {
    @apply text-4xl;
    @apply font-bold;
    @apply tracking-tighter;
    @apply mt-2;
    @apply mb-4;
  }
</style>
