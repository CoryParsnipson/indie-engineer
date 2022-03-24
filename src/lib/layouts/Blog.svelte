<script>
  import { slugify } from '$lib/util/string';

  // frontmatter exports
  export let title;
  export let author;
  export let date;
  export let summary;
  export let readingTime;
  export let categories = [];

  let sidebar_on_left = false;
  let title_slug = slugify(title);
</script>

<div class="flex justify-center gap-6" class:flex-row-reverse={sidebar_on_left}>
  <main class="flex-initial w-full lg:w-2/3 bg-green-300">
    <h6>{date}</h6>
    <h1 id="{title_slug}">{title}
      <a aria-hidden="true" tabindex="-1" class="align-middle" href="#{title_slug}">
        <span class="icon icon-link"></span>
      </a>
    </h1>
    <p class="font-sans leading-normal text-lg mb-4">by {author}</p>
    <div class="w-1/12 mb-5 border-t-4 border-zinc-600"></div>
    <h5 class="text-slate-500 my-4">{readingTime.text}</h5>
    <div class="mb-8"></div>

    <slot />
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
