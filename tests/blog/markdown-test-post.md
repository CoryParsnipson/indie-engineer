---
title: "BREAKING NEWS: Internet man creates new Blog using Svelte and mdsvex"
author: Cory Parsnipson
summary: Cory makes a blog using sveltekit and mdsvex
date: Thu Feb 24 06:09:07 PM PST 2022
categories:
  - test
  - dev
  - news
---

<script>
  import Clock from '$lib/components/Clock.svelte'
</script>

This is a test post for development.

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

## This is a longer header 2 section blah blah blah blah blah

### This is a longer header 3 section

This is regular text. And here is a link to my [other website](http://www.slackerparadise.com).

<div style="width: 200px">
  <Clock />
</div>

```javascript
import remark from "remark";
import html from "remark-html";

// ...

remark()
  .use(html)
  .process(input_markdown, function (err, html_output) {
    if (err) throw err;

    console.log(html_output);
  });
```

This is the first post.
w00t.

Articles to write about:

1. About page article: what does Invert the pyramid mean??? Explain pyramid.
1. Write about uber
1. Write about turn key real estate.
1. Write about initial consultation with real estate guy.
1. Write about uber'ing "working woman" to work????
1. Write about uber "destination problem"
1. Write about static site generators. Elder.js, elventy, sveltekit + remark -> finally sveltekit + MDsveX
1. Write about groupthink/thinkpile
1. Write about Anime -> Manga mapping site.

