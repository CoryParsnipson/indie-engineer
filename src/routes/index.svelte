<script context="module">
  import { env } from '$lib/util/env';

  export const load = async ({ url, fetch }) => {
    const postsResp = await fetch(`/api/posts.json?${url.searchParams.toString()}`);
    const posts = await postsResp.json();

    return {
      props: {
        ...posts
      },
    };
  };
</script>

<script>
  import { page } from '$app/stores';

  import PostPreview from '$lib/components/PostPreview.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  export let posts = [];
  export let num_pages;
  export let page_size;
  export let current_page;

  let meta_description = "This is a blog about eschewing the safety and routine of office work and trying to survive on the merit of one's own creations. Can an Engineer/Maker earn a living off of their own creations?"
</script>

<svelte:head>
  <title>Indie Engineer</title>
  <meta name="description" content="{meta_description}">
  <meta name="og:title" property="og:title" content="Indie Engineer">
  <meta name="og:description" property="og:description" content="{meta_description}">
  <meta name="og:type" property="og:type" content="website">
  <meta name="og:image" property="og:image" content="/site/indie-engineer-og-image.png">

  <meta name="twitter:card" property="twitter:card" content="summary_large_image">
  <meta name="twitter:site" property="twitter:site" content="@CoryParsnipson">
  <meta name="twitter:title" property="twitter:title" content="Indie Engineer">
  <meta name="twitter:description" property="twitter:description" content="{meta_description}">
  <meta name="twitter:creator" property="twitter:creator" content="@CoryParsnipson">
  <meta name="twitter:image" property="twitter:image" content="{$page.url.origin}/site/indie-engineer-og-image.png">
</svelte:head>

<main class="py-12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
    {#each posts as post}
      <PostPreview
        metadata = {post.meta}
        path = {post.path}
      />
   {/each}
  </div>

  <Pagination
    currentPage={parseInt($page.url.searchParams.get('p')) || current_page}
    pageSize={parseInt($page.url.searchParams.get('size')) || page_size}
    minPage={1}
    maxPage={num_pages}
  />
</main>
