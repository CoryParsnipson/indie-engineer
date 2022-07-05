<script>
  import { page } from '$app/stores';

  export let meta = {
    title: "Default title",
    description: "Default description",
    type: "website",
    image: "",
    twitter_user: "",
  };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content="{meta.description}">

  <meta name="og:title" property="og:title" content="{meta.title}">
  <meta name="og:description" property="og:description" content="{meta.description}">
  <meta name="og:type" property="og:type" content="{meta.type}">
  <meta name="og:image" property="og:image" content="{$page.url.origin}{meta.image}">

  <meta name="twitter:card" property="twitter:card" content="summary_large_image">
  <meta name="twitter:site" property="twitter:site" content="{meta.twitter_user}">
  <meta name="twitter:title" property="twitter:title" content="{meta.title}">
  <meta name="twitter:description" property="twitter:description" content="{meta.description}">
  <meta name="twitter:creator" property="twitter:creator" content="{meta.twitter_user}">
  <meta name="twitter:image" property="twitter:image" content="{$page.url.origin}{meta.image}">
</svelte:head>
