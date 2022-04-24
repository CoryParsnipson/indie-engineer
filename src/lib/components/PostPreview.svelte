<script>
  import Categories from "$lib/components/Categories.svelte";

  export let metadata;
  export let path;

  let date = new Date(metadata.date).toLocaleDateString('en-us', { dateStyle: "long" });
</script>

<div class="bg-cream-50 rounded-2xl p-4 mb-5">
  <a href="{path}">
    {#if metadata.date}<p class="text-zinc-700 mb-0">{date}</p>{/if}
    <h2 class="text-3xl tracking-tighter mb-4">{metadata.title}</h2>
    {#if metadata?.categories?.length > 0}
      <Categories categories={metadata.categories} />
    {/if}
    <p class="text-lg text-emerald-800 mt-4 mb-4">{metadata.readingTime.text}</p>
    {#if metadata.summary}<p class="mb-0">{metadata.summary}</p>{/if}
  </a>
</div>
