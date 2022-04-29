<script>
  import Categories from "$lib/components/Categories.svelte";

  export let metadata;
  export let path;

  $: date = new Date(metadata.date).toLocaleDateString('en-us', { dateStyle: "long" });
</script>

<div class="post-card bg-cream-50 hover:drop-shadow-md rounded-2xl">
  <a href="{path}" class="post-container block w-full h-full py-4">
    {#if metadata.date}
      <p class="font-serif text-lg text-zinc-700 mb-0">{date}</p>
    {/if}

    <h2 class="font-title text-4xl tracking-tight mb-4">{metadata.title}</h2>

    {#if metadata?.categories?.length > 0}
      <Categories categories={metadata.categories} />
    {/if}

    <p class="font-serif text-lg text-emerald-800 mt-4 mb-4">{metadata.readingTime.text}</p>

    {#if metadata.seo_image}
      <img src="{metadata.seo_image}" alt="Image for {metadata.title}" class="mb-4">
    {/if}

    {#if metadata.summary}
      <p class="font-serif text-lg sm:text-xl leading-relaxed sm:leading-relaxed tracking-markdown mb-0">
        {metadata.summary}
      </p>
    {/if}

    <p class="
      font-serif text-lg sm:text-xl text-center leading-relaxed sm:leading-relaxed tracking-markdown
      text-emerald-700
      mt-4 mb-2">
      &raquo; Read more &laquo;
    </p>
  </a>
</div>

<style>
  :global(a.post-container :not(img)) {
    @apply px-4;
  }
</style>
