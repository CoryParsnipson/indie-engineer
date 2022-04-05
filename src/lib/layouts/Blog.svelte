<script>
  import Categories from '$lib/components/Categories.svelte';
  import MailSignupForm from '$lib/components/MailSignupForm.svelte';

  import { slugify } from '$lib/util/string';

  // frontmatter exports
  export let title;
  export let author;
  export let date;
  export let readingTime;
  export let categories = [];

  let sidebar_on_left = false;
  let title_slug = slugify(title);
  let readable_date = new Date(date).toLocaleDateString('en-us', { dateStyle: "long" });
</script>

<div class="flex justify-center gap-6" class:flex-row-reverse={sidebar_on_left}>
  <main class="flex-initial w-full md:max-w-[700px] lg:w-2/3 bg-green-300 py-12">
    <Categories {categories} />
    <h1 id="{title_slug}">{title}
      <a aria-hidden="true" tabindex="-1" class="align-middle" href="#{title_slug}">
        <span class="icon icon-link"></span>
      </a>
    </h1>

    <p class="font-sans font-bold text-base text-slate-500 my-4">{#if author}by {author} &nbsp;&nbsp;&#183;&nbsp;&nbsp; {/if}
      {#if date}{readable_date} &nbsp;&nbsp;&#183;&nbsp;&nbsp; {/if}
      {#if readingTime?.text}{readingTime.text}{/if}</p>
    <div class="w-1/12 mb-5 border-t-4 border-zinc-600"></div>
    <div class="mb-8"></div>

    <slot />

    <MailSignupForm />
  </main>

  <sidebar class="w-1/3 hidden lg:block bg-purple-300">
    <div
      class="fixed pl-4 border-slate-400 bg-cyan-400"
      class:border-l-4={!sidebar_on_left}
      class:border-r-4={sidebar_on_left}
    >
    </div>
  </sidebar>
</div>

<style>
  /* markdown styles */

  /* headers */
  /* ------------------------------------------------------------------------ */
  :global(main h1),
  :global(main h2),
  :global(main h3),
  :global(main h4),
  :global(main h5),
  :global(main h6) {
    @apply scroll-mt-32; /* NOTE: this is hardcoded, but the value should be dependent on header height */
    @apply font-title;
  }

  :global(main h1) {
    @apply text-5xl;
    @apply mt-2;
    @apply mb-4;
  }

  :global(main h2) {
    @apply text-4xl;
    @apply mb-8;
  }

  :global(main h3) {
    @apply text-3xl;
    @apply mb-4;
  }

  :global(main h4) {
    @apply text-2xl;
  }

  :global(main h5) {
    @apply text-lg;
  }

  :global(main h6) {
    @apply text-base;
  }

  /* rehype autolink header styles */
  /* ------------------------------------------------------------------------ */
  :global(main span[class*="icon-link"]) {
    @apply min-w-[1.05rem];
    @apply min-h-[1.05rem];
    @apply inline-block;
    @apply mx-2;
    @apply my-1;
  }

  :global(main h1:hover span[class*="icon-link"]),
  :global(main h2:hover span[class*="icon-link"]),
  :global(main h3:hover span[class*="icon-link"]),
  :global(main h4:hover span[class*="icon-link"]),
  :global(main h5:hover span[class*="icon-link"]),
  :global(main h6:hover span[class*="icon-link"]) {
    @apply bg-[url('/icon-link.png')];
    @apply bg-cover;
  }

  /* inline text */
  /* ------------------------------------------------------------------------ */
  :global(main) {
    @apply font-serif;
  }

  :global(main p), :global(main em), :global(main strong) {
    @apply text-lg;

    @apply font-serif;
    @apply mb-10;
    @apply leading-loose;
    @apply tracking-markdown;

    @apply sm:text-xl;
    @apply sm:leading-loose;
  }

  /* inline hyperlinks */
  /* ------------------------------------------------------------------------ */
  :global(main a[rel]) {
    @apply text-lg;
    @apply text-blue-700;
    @apply font-serif;
    @apply underline;
    @apply py-1;
    @apply px-0.5;

    @apply sm:text-xl;
  }

  :global(main a[rel]:after) {
    content: '';

    @apply inline-block;
    @apply align-baseline;
    @apply min-w-[1.03rem];
    @apply min-h-[1.03rem];
    @apply bg-[url('/external-link.png')];
    @apply bg-cover;
    @apply ml-1;
  }

  :global(main a[rel]:hover) {
    @apply bg-slate-200;
  }

  :global(main a[rel]:active) {
    @apply text-red-700;
  }

  :global(main a[rel]:visited) {
    @apply text-purple-700;
  }

  /* inline list styles */
  /* ------------------------------------------------------------------------ */
  :global(main ul) {
    @apply list-disc;
  }

  :global(main ol) {
    @apply list-decimal;
  }

  :global(main ul, main ol) {
    @apply ml-6;
    @apply list-outside;
    @apply mb-12;
  }

  :global(main li) {
    @apply text-xl;
    @apply pl-4;
    @apply mb-2;
    @apply font-serif;
  }

  /* images */
  /* ------------------------------------------------------------------------ */
  :global(main img, main p img) {
    @apply mx-auto;
  }

  :global(main > img) {
    @apply mb-12;
  }

  :global(main figure) {
    @apply mb-5;
  }

  :global(main figure figcaption) {
    @apply font-serif;
    @apply text-lg;
    @apply italic;
    @apply text-center;
  }

  /* code block */
  /* ------------------------------------------------------------------------ */
  :global(main pre span), :global(main code span) {
    @apply font-mono;
  }

  :global(main pre), :global(main pre[class*="language-"]) {
    @apply bg-slate-800;
    @apply text-slate-200;
    @apply rounded-2xl;
    @apply p-6;
    @apply my-3;
  }

  :global(main code[class*="language-"]) {
    @apply inline-block;
  }
</style>
