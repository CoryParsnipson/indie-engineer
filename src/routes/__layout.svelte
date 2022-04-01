<script>
	import '../app.css';
</script>

<header class="sticky top-0 w-full mb-12 z-50 bg-cyan-800 text-slate-100">
  <div class="flex items-stretch gap-4 max-w-screen-lg sm:mx-auto px-5 bg-green-100">
    <img src="/indie-engineer-logo.png" class="p-4 pl-0">

    <div class="nav grow flex items-stretch justify-end bg-zinc-800">
      <a href="/"><span>Blog</span></a>
      <a href="#"><span>About</span></a>
    </div>
  </div>
</header>

<div id="content" class="w-full max-w-screen-lg mx-auto px-5 bg-cyan-100">
  <slot />
</div>

<footer class="mt-12 p-3 z-50 bg-cyan-800 text-slate-100">
  <div class="font-title text-xl max-w-screen-lg sm:mx-auto">
    This website was made with sveltekit + tailwindcss + mdsvex.
    (And svelte, postcss, ...)
  </div>
</footer>

<style>
  div.nav a {
    @apply flex;
    @apply items-center;
    @apply px-8;
    @apply py-2;
    @apply border-b-4;
    @apply border-transparent;
  }

  div.nav a span {
    @apply text-lg;
    @apply font-title;
    @apply uppercase;
  }

  div.nav a:hover {
    @apply border-slate-200;
  }
</style>
