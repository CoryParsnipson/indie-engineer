<script>
  import Categories from "$lib/components/Categories.svelte";

  export let metadata;
  export let path;

  let date = new Date(metadata.date).toLocaleDateString('en-us', { dateStyle: "long" });
</script>

<div class="bg-slate-100 rounded-2xl p-4 mb-5">
  <a href="{path}">
    {#if metadata.date}<p>{date}</p>{/if}
    <h2 class="text-3xl font-bold tracking-tighter mb-4">{metadata.title}</h2>
    {#if metadata?.categories?.length > 0}
      <Categories categories={metadata.categories} />
    {/if}
    <p class="text-slate-500 mt-4">{metadata.readingTime.text}</p>
    {#if metadata.summary}<p class="mt-6 mb-0">{metadata.summary}</p>{/if}
  </a>
</div>
