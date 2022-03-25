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
</script>

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
