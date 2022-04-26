<script>
  export let currentPage = 1;
  export let minPage = undefined;
  export let maxPage = undefined;
</script>

<div class="flex justify-center">
  <div class="pagination-container
              inline-flex flex-row justify-center items-stretch
              rounded-xl bg-cream-300 mx-auto mt-8">
    {#if currentPage !== 0 && currentPage !== 1}
    <div class="flex hover:bg-cream-400 hover:cursor-pointer pl-4 pr-6 py-3">
      <svg width="24px" height="24px">
        <path d="M16,7 L11,13 L16,19" class="fill-transparent stroke-cream-600 stroke-2"></path>
        <path d="M12,7 L7,13 L12,19" class="fill-transparent stroke-cream-600 stroke-2"></path>
      </svg>
      <p class="font-serif hidden md:block text-lg text-cream-800">First</p>
    </div>
  
    <div class="flex hover:bg-cream-400 hover:cursor-pointer pl-4 pr-6 py-3">
      <svg width="24px" height="24px">
        <path d="M14,7 L9,13 L14,19" class="fill-transparent stroke-cream-600 stroke-2"></path>
      </svg>
      <p class="font-serif hidden md:block text-lg text-cream-800">Prev</p>
    </div>
    {/if}
  
    <p class="font-serif text-xl text-cream-800 py-3 px-8">{currentPage ? currentPage : '·'}</p>
  
    {#if currentPage !== maxPage}
    <div class="flex hover:bg-cream-400 hover:cursor-pointer pl-6 pr-4 py-3">
      <p class="font-serif hidden md:block text-lg text-cream-800">Next</p>
      <svg width="24px" height="24px">
        <path d="M10,7 L15,13 L10,19" class="fill-transparent stroke-cream-600 stroke-2"></path>
      </svg>
    </div>
  
    <div class="flex hover:bg-cream-400 hover:cursor-pointer pl-6 pr-4 py-3">
      <p class="font-serif hidden md:block text-lg text-cream-800">Last</p>
      <svg width="24px" height="24px">
        <path d="M8,7 L13,13 L8,19" class="fill-transparent stroke-cream-600 stroke-2"></path>
        <path d="M12,7 L17,13 L12,19" class="fill-transparent stroke-cream-600 stroke-2"></path>
      </svg>
    </div>
    {/if}
  </div>
</div>

<style>
  p {
    /* HACK note: this is only here to override the :global styles from the Blog layout */
    @apply m-0;
  }

  .pagination-container div:first-child {
    @apply rounded-l-xl;
  }

  .pagination-container div:last-child {
    @apply rounded-r-xl;
  }
</style>
