<svelte:head>
  <title>About :: Indie Engineer</title>
  <meta name="description" content="Learn more about being an Indie Engineer. What even is a Work Diet??? Who even is this Cory Parsnipson guy???">
</svelte:head>

<main>
  <h1 class="font-title text-5xl mt-12 mb-12">About...</h1>
  <h2 class="font-title text-4xl mb-8">The Author</h2>

  <div class="flex gap-5 items-center mb-12">
    <img src="/cparsnipson.png" height="183px" width="182px" alt="Headshot of Cory Parsnipson">
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
