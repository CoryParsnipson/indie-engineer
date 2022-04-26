<script>
  import GoogleTagManager from '$lib/components/GoogleTagManager.svelte';

	import '../app.css';
  import { env } from '$lib/util/env';

  let current_year = new Date().getFullYear();
</script>

<GoogleTagManager
  enable={env.var.VITE_GTM_ENABLE === "true"}
  gtmId={env.var.VITE_GTM_ID}
  dev={env.var.VITE_INSTANCE === "dev"}
/>

<header class="sticky top-0 w-full z-50 bg-emerald-500 text-zinc-900">
  <div class="flex items-stretch gap-4 max-w-screen-lg sm:mx-auto">
    <img alt="Indie Engineer logo" src="/indie-engineer-logo.png" class="px-2 py-4 hidden sm:block">
    <img alt="Indie Engineer logo" src="/indie-engineer-logo-sm.png" class="px-2 py-1 sm:hidden">

    <div class="nav dropdown grow">
      <div class="justify-end flex items-center h-full mx-5 md:hidden">
        <svg width="24px" height="24px">
          <path d="M5 6h18M5 12h18M5 18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      </div>
      <div class="dropdown-content">
        <a href="/"><span>Blog</span></a>
        <a href="/about"><span>About</span></a>
      </div>
    </div>

  </div>
</header>

<div id="content" class="w-full max-w-screen-lg mx-auto">
  <slot />
</div>

<footer class="z-50 bg-emerald-500 text-zinc-900">
  <div class="flex flex-col-reverse md:flex-row items-stretch justify-center max-w-screen-lg mx-auto">
    <div class="md:w-3/5 p-3 flex flex-col justify-end">
      <p class="grow"></p>
      <p class="font-title mb-3">This website was made with SvelteKit, TailwindCSS, and MDsveX. <a class="font-title hover:text-zinc-700 hover:cursor-pointer" href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Chanut - Flaticon</a>.</p>
      <p class="font-title">Copyright © {current_year} Cory Parsnipson. All Rights Reserved.</p>
    </div>

    <div class="md:w-2/5 bg-cream-200">
      <img src="/indie-engineer-logo.png" alt="Indie Engineer logo" width="250px" class="mx-auto pt-8 pb-4" />
      <p class="font-title text-zinc-900 text-center mb-6">- Links -</p>
      <div class="flex gap-5 justify-center mb-12">
        <a href="/contact">
          <img src="/email.png" width="50px" alt="Click here to email the authors">
        </a>
        <a href="https://github.com/CoryParsnipson" target="_blank" rel="nofollow noopener">
          <img src="/GitHub-Mark-120px-plus.png" width="50px" alt="Click here to go to Cory Parsnipson's GitHub page.">
        </a>
        <a href="https://twitter.com/CoryParsnipson" target="_blank" rel="nofollow noopener">
          <img src="/twitter-icon.png" width="50px" alt="Click here to visit Cory Parsnipson's twitter.">
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .dropdown {
    @apply relative inline-block md:flex;
  }

  .dropdown-content {
    @apply hidden absolute right-0 md:flex md:w-full md:relative md:justify-end;
  }

  .dropdown-content a {
    @apply block px-10 py-6 bg-emerald-500 md:flex md:items-center md:px-5 md:border-b-4 md:border-transparent;
  }

  .dropdown-content a:hover {
    @apply md:border-emerald-700 md:bg-transparent;
  }

  .dropdown-content a span {
    @apply text-xl font-title uppercase md:text-xl;
  }

  .dropdown:hover .dropdown-content {
    @apply block md:flex;
  }
</style>
