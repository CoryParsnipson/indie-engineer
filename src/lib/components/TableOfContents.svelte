<script>
  export let headings = undefined;
</script>

<nav id="toc">
  <ul>
    {#each headings as heading}
      <li class="mb-1">
        <a href="{heading.link}"
           class="font-serif text-cream-800 text-md inline-block {heading.tag}
           hover:bg-cream-200 hover:text-emerald-800 rounded-md px-2 py-1">
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .h1 { @apply font-bold; }
  .h2 {}
  .h3 { @apply ml-3; }
  .h4 { @apply text-emerald-600 hover:text-emerald-800 ml-6; }
</style>
