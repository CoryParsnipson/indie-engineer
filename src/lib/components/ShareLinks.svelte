<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let show_title = true;
  export let article_title = "";

  $: tweet_default_msg = article_title + "\n" + $page.url;
  $: email_msg = "Check out this article:\n\n" + article_title + "\n\n (from " + $page.url + ")";

  onMount(async () => {
    if (!article_title) {
      let res = document.head.querySelector("[property='og:title'][content]").content;
      res = res.split('::')[0];
      article_title = res.trim();
    }
  });
</script>

<div class="my-6" class:mb-8={show_title}>
  {#if show_title}<p class="font-title m-0">Share this Article:</p>{/if}
  <div class="flex flex-wrap items-center gap-3" class:mt-6={show_title}>
    <a href="https://www.facebook.com/sharer/sharer.php?u={encodeURI($page.url)}" target="_blank">
      <img src="/share-facebook.png" title="Share on Facebook" alt="Share on Facebook">
    </a>
    <a href="https://twitter.com/intent/tweet?via=CoryParsnipson&text={encodeURI(tweet_default_msg)}" target="_blank">
      <img src="/share-twitter.png" title="Share on Twitter" alt="Share on Twitter">
    </a>
    <a href="https://reddit.com/submit?url={encodeURI($page.url)}&title={encodeURI(article_title)}" target="_blank">
      <img src="/share-reddit.png" title="Share on Reddit" alt="Share on Reddit">
    </a>
    <a href="mailto:?subject={encodeURI(article_title)}&body={encodeURI(email_msg)}" target="_blank">
      <img src="/share-email.png" title="Share via email" alt="Share via email">
    </a>
  </div>
</div>

<style>
  img { @apply w-[40px] h-[40px] p-0 m-0 hover:opacity-75 hover:cursor-pointer; }
</style>
