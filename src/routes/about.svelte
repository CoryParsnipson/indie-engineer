<script>
  let meta_description = "Learn more about being an Indie Engineer. What even is a Work Diet??? Who even is this Cory Parsnipson guy???";
</script>

<svelte:head>
  <title>About :: Indie Engineer</title>
  <meta name="description" content="{meta_description}">
  <meta name="og:title" property="og:title" content="Indie Engineer :: About">
  <meta name="og:description" property="og:description" content="{meta_description}">
  <meta name="og:type" property="og:type" content="website">
  <meta name="og:image" property="og:image" content="/site/indie-engineer-og-image.png">

  <meta name="twitter:card" property="twitter:card" content="summary">
  <meta name="twitter:site" property="twitter:site" content="@CoryParsnipson">
  <meta name="twitter:title" property="twitter:title" content="Indie Engineer :: About">
  <meta name="twitter:description" property="twitter:description" content="{meta_description}">
  <meta name="twitter:creator" property="twitter:creator" content="@CoryParsnipson">
  <meta name="twitter:image" property="twitter:image" content="/site/indie-engineer-og-image.png">
</svelte:head>

<main>
  <h1 class="font-title text-5xl mt-12 mb-12">About...</h1>
  <h2 class="font-title text-4xl mb-8">The Author</h2>

  <div class="flex gap-5 items-center mb-12">
    <img src="/site/headshot-cparsnipson.png" height="183px" width="182px" alt="Headshot of Cory Parsnipson">
    <p>Cory Parsnipson graduated with absolutely no honors from Caldwell University, class of '12. He is a super smart person and handsome. He is popular + has many friends.</p>
  </div>
  <h2 class="font-title text-4xl mb-8">The Website</h2>
  <p class="mb-10">Coming soon...</p>
  <h2 class="font-title text-4xl mb-8">The Work Diet</h2>
  <p class="mb-10">Coming soon...</p>
</main>

<style>
  p { @apply text-lg font-serif leading-loose tracking-markdown; }

  @media (min-width: 640px) {
    p { @apply text-xl font-serif leading-loose tracking-markdown; }
  }
</style>
