<script>
	import '../app.css';
</script>

<header class="sticky top-0 w-full mb-12 z-50 bg-cyan-800 text-slate-100">
  <div class="flex items-stretch gap-4 max-w-screen-lg sm:mx-auto px-5">
    <p>Cory's Blog</p>

    <div class="nav grow">
      <div class="flex gap-3 h-full items-stretch justify-end">
        <p><a href="/">Blog</a></p>
        <p><a href="#">About</a></p>
      </div>
    </div>
  </div>
</header>

<div id="content" class="w-full max-w-screen-lg mx-auto px-5 bg-cyan-100">
  <slot />
</div>

<footer class="mt-12 p-3 z-50 bg-cyan-800 text-slate-100">
  <div class="max-w-screen-lg sm:mx-auto">
    This website was made with sveltekit + tailwindcss + mdsvex.
    (And svelte, postcss, ...)
  </div>
</footer>
