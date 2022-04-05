<script>
	import '../app.css';
</script>

<header class="sticky top-0 w-full z-50 bg-cyan-800 text-slate-100">
  <div class="flex items-stretch gap-4 max-w-screen-lg sm:mx-auto pl-5 sm:px-5 bg-green-100">
    <img src="/indie-engineer-logo.png" class="p-2 pl-0 hidden sm:block">
    <img src="/indie-engineer-logo-sm.png" class="py-1 pr-2 pl-0 sm:hidden">

    <div class="nav dropdown grow bg-zinc-800">
      <div class="justify-end flex items-center h-full mx-5 md:hidden">
        <svg width="24px" height="24px">
          <path d="M5 6h18M5 12h18M5 18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
        </svg>
      </div>
      <div class="dropdown-content">
        <a href="/"><span>Blog</span></a>
        <a href="#"><span>About</span></a>
      </div>
    </div>

  </div>
</header>

<div id="content" class="w-full max-w-screen-lg mx-auto px-5 bg-cyan-100">
  <slot />
</div>

<footer class="p-3 z-50 bg-cyan-800 text-slate-100">
  <div class="font-title text-xl max-w-screen-lg sm:mx-auto">
    This website was made with sveltekit + tailwindcss + mdsvex.
    (And svelte, postcss, ...)
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
