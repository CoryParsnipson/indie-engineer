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

<header class="sticky top-0 w-full z-50 bg-cyan-800 text-slate-100">
  <div class="flex items-stretch gap-4 max-w-screen-lg sm:mx-auto pl-5 sm:px-5 bg-green-100">
    <img alt="Indie Engineer logo" src="/indie-engineer-logo.png" class="p-2 pl-0 hidden sm:block">
    <img alt="Indie Engineer logo" src="/indie-engineer-logo-sm.png" class="py-1 pr-2 pl-0 sm:hidden">

    <div class="nav dropdown grow bg-zinc-800">
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

<div id="content" class="w-full max-w-screen-lg mx-auto px-5 bg-cyan-100">
  <slot />
</div>

<footer class="z-50 bg-cyan-800 text-slate-100">
  <div class="flex flex-col-reverse md:flex-row items-stretch justify-center max-w-screen-lg mx-auto">
    <div class="md:w-3/5 p-3 flex flex-col justify-end">
      <p class="grow"></p>
      <p class="font-title mb-3">This website was made with SvelteKit, TailwindCSS, and MDsveX. <a class="font-title hover:text-slate-300 hover:cursor-pointer" href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Chanut - Flaticon</a>.</p>
      <p class="font-title">Copyright © {current_year} Cory Parsnipson. All Rights Reserved.</p>
    </div>

    <div class="md:w-2/5 bg-stone-300">
      <img src="/indie-engineer-logo.png" alt="Indie Engineer logo" width="250px" class="mx-auto pt-8 pb-4" />
      <p class="font-title text-slate-800 text-center mb-6">- Links -</p>
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

  <div class="font-title text-xl max-w-screen-lg sm:mx-auto">
  </div>
</footer>

<style>
  .dropdown {
    @apply relative;
    @apply inline-block;

    @apply md:flex;
  }

  .dropdown-content {
    @apply hidden;
    @apply absolute;
    @apply right-0;

    @apply md:flex;
    @apply md:w-full;
    @apply md:relative;
    @apply md:justify-end;
  }

  .dropdown-content a {
    @apply block;
    @apply px-10;
    @apply py-6;
    @apply bg-zinc-800;

    @apply md:flex;
    @apply md:items-center;
    @apply md:px-5;
    @apply md:border-b-4;
    @apply md:border-transparent;
  }

  .dropdown-content a:hover {
    @apply bg-zinc-600;

    @apply md:border-zinc-200;
    @apply md:bg-transparent;
  }

  .dropdown-content a span {
    @apply text-xl;
    @apply font-title;
    @apply uppercase;

    @apply md:text-lg;
  }

  .dropdown:hover .dropdown-content {
    @apply block;
    @apply md:flex;
  }
</style>
