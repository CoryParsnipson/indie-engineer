<script>
  export let categories = [];
</script>

<div class="flex gap-2">
  {#each categories as category}
    <a class="py-1 px-4 rounded-2xl hover:bg-slate-400 active:bg-slate-50 bg-slate-300 text-base">
      {category}
    </a>
  {/each}
</div>
