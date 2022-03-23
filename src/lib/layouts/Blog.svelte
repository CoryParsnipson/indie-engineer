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

<div class="flex justify-center gap-6 pt-8 pb-4" class:flex-row-reverse={sidebar_on_left}>
  <main class="flex-initial max-w-[700px] w-[700px]">
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
</div>
