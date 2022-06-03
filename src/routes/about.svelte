<script>
  import WorkDiet from '$lib/components/charts/WorkDiet.svelte';

  let meta_description = "Learn more about being an Indie Engineer. What even is a Work Diet??? Who even is this Cory Parsnipson guy???";
</script>

<svelte:head>
  <title>About :: Indie Engineer</title>
  <meta name="description" content="{meta_description}">
  <meta name="og:title" property="og:title" content="Indie Engineer :: About">
  <meta name="og:description" property="og:description" content="{meta_description}">
  <meta name="og:type" property="og:type" content="website">
  <meta name="og:image" property="og:image" content="/site/indie-engineer-og-image.png">

  <meta name="twitter:card" property="twitter:card" content="summary_large_image">
  <meta name="twitter:site" property="twitter:site" content="@CoryParsnipson">
  <meta name="twitter:title" property="twitter:title" content="Indie Engineer :: About">
  <meta name="twitter:description" property="twitter:description" content="{meta_description}">
  <meta name="twitter:creator" property="twitter:creator" content="@CoryParsnipson">
  <meta name="twitter:image" property="twitter:image" content="/site/indie-engineer-og-image.png">
</svelte:head>

<main>
  <h1 class="font-title text-5xl mt-12 mb-12">About...</h1>
  <h2 class="font-title text-4xl mb-8">The Author</h2>

  <div class="flex flex-col sm:flex-row gap-12 items-start">
    <img src="/site/headshot-cparsnipson.png" alt="Headshot of Cory Parsnipson" height="182px" width="183px" class="w-1/2 h-auto mx-auto sm:mx-0 sm:w-1/4 sm:py-6">

    <div class="sm:w-3/4">
      <p>Hey, it's me, Cory Parsnipson! I graduated with a degree in Computer Engineering and a minor in Computer Science from Caldwell University, class of '12. I am a super smart person and handsome + have many friends.</p>

      <p>I'm currently focused mainly on web development, but I am also interested in digital hardware design, game programming, electronics, and 3D printing. When I'm not working I like drawing, reading, video games, and anime. I occasionally dabble in longboarding and rockclimbing.</p>

      <p>Were you looking to contact me? Send me an email <a href="/contact" alt="Contact Me">here</a>.</p>
    </div>
  </div>

  <h2 class="font-title text-4xl mb-8">This Website</h2>
  <p>After spending almost a decade in various tech companies, I was burnt out from repetitive and bureaucratic office life and decided to focus on building my own projects. This is much more fun so now I'm trying to do this full time. And here we are.</p>

  <p>This whole website is a one-man show put together by <span class="italic">moi</span>. Think of it as a journal for documenting the results of my endeavors and the things I learn along the way. Whether it's driving for Uber, looking into stocks, building websites, or making games, I've come to the realization that there's a lot of really interesting findings from places you wouldn't expect. I want to share these things with like-minded individuals across the web.</p>

  <h2 class="font-title text-4xl mb-8">The Work Diet</h2>
  <p>I'm going to reference "The Work Diet" repeatedly in my posts. Prior to starting this blog, I tried doing one big project and focusing all my time trying to make it work. I realized that this leap of faith left too many things to chance and that taking a different, more diversified approach might be more beneficial to me. The Work Diet is an organization tool I made up to accomplish this. Here it is:</p>

  <div class="md:w-8/12 mx-auto">
  <WorkDiet legend={true} show_layer_names={true} show_hours={false} data=
    {[
      [
        { item: "Uber driving", hours: 14, status: "active" },
        { item: "freelancing", hours: 6, status: "discarded" },
        { item: "tutoring", hours: 0, status: "paused" },
        { item: "stocks", hours: 0, status: "passive" },
      ],
      [
        { item: "blogging", hours: 12, status: "passive" },
        { item: "Etsy / Redbubble / Zazzle", hours: 5, status: "paused" },
        { item: "real estate investing", hours: 3, status: "blocked" },
        { item: "streaming", hours: 0, status: "inactive"},
      ],
      [
        { item: "websites", hours: 5, status: "active" },
        { item: "apps", hours: 5, status: "paused" },
        { item: "APIs", hours: 5, status: "inactive" },
      ],
      [
        { item: "art", hours: 0, status: "inactive" },
        { item: "making videogames", hours: 0, status: "inactive"},
        { item: "3D modeling", hours: 0, status: "blocked" },
      ],
      [
        {item: "RPi game console", hours: 0, status: "paused"},
      ]
    ]} />
  </div>

  <p>This is an example, where the contents and statuses of the items may not be up to date.</p>

  <p>I've always had trouble with analysis paralysis so picking my "next career move" was very difficult. I wrote down a list of ideas that I thought I could use to make a living and then sorted them in order of achievability. This way lets me strike a nice balance between focusing on surviving and trying out different skills. I start at the bottom of the chart and try things out, discarding them or getting more efficient at them, and then gradually work my way up to the top.</p>

  <p>The more achievable things (i.e. immediate cash flow) items go on the bottom and help me pay rent in the short term. The top layers are fantastical and difficult, but fun things that I want to strive for. This makes the Work Diet a gradient of work from realistic to passion project. A second key part of the graph is that a large portion of the items that I try should be "passive" sources of income to give me a buffer to concentrate on the upper layers.</p>

  <p>The ultimate goal is to concentrate on the top level items and make a career out of them (or just do them and enjoy it and then discard and replace as desired). The precondition for this is to set up a handful of passive income streams from the lower levels that can cover my living expenses.</p>

  <p>For a more detailed explanation, see <a href="/blog/i-left-my-office-job" alt="I Left my Office Job and Now I'm Trying to Make it as an Independent Engineer">I Left my Office Job and Now I'm Trying to Make it as an Independent Engineer</a>.</p>
</main>

<style>
  span, p { @apply text-xl font-serif leading-loose tracking-markdown mb-12; }

  @media (min-width: 640px) {
    span, p { @apply text-xl font-serif leading-loose tracking-markdown mb-12; }
  }

  main a {
    @apply text-xl text-emerald-700 font-serif underline py-1 pr-0.5;
  }

  @media (min-width: 640px) {
    main a {
      @apply text-xl text-emerald-700 font-serif underline py-1 pr-0.5;
    }
  }

  main a:after {
    content: '';
    @apply inline-block align-baseline min-w-[1.03rem] min-h-[1.03rem] bg-[url('/site/icon-external-link.png')] bg-cover ml-1;
  }

  main a:hover {
    @apply bg-cream-200;
  }

  main a:active {
    @apply text-red-700;
  }

  main a:visited {
    @apply text-emerald-700;
  }
</style>
