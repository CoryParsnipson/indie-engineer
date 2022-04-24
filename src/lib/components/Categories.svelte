<script>
  export let categories = [];
</script>

<div class="flex flex-wrap gap-2">
  {#each categories as category}
    <a class="py-1 px-4 rounded-lg text-lg font-serif text-cream-800 bg-cream-300
              hover:bg-cream-400 hover:cursor-pointer active:bg-cream-200">
      {category}
    </a>
  {/each}
</div>
