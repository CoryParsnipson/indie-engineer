---
title: "Learning Elder.js: The Documentation Could Use Some Work"
seo_title:
author: Cory Parsnipson
summary: I tried using Elder.js to make a static site markdown blog. Elder.js is an SEO focused static site generator written in Svelte and aimed at Enterprise level users. Have you heard of this software package before? I give my two cents at what it feels like to ramp-up on it.
seo_image: /articles/elderjs-cover.png
date: Tue Jun 14 01:09:15 PM PDT 2022
categories:
  - programming
  - web development
  - svelte
  - elderjs
  - tech rant
  - blog
---

Normally there isn't much I have to say about software packages other than "easy to use, love it" or "not what I'm looking for", but I had quite a unique experience trying to use [Elder.js](https://github.com/Elderjs/elderjs) to make a website. More specifically, trying to figure out *how* to use Elder.js was like chasing concepts in circles Scooby-Doo style while Benny Hill music blares in the background.

**UPDATE: The documentation issues I wrote about may be fixed soon!** I was met with great enthusiasm when I popped into their [discord](https://discord.gg/w6tvtp6trK) and told there was a big version bump coming soon with a streamlined rewrite of the documentation. Sounds exciting! I recommend giving Elder.js a try. If you are reading this before the new version releases, maybe the tips in this article may help parse the docs.

## Enter: Svelte.js

This all started when I decided to make a static site blog written in [Svelte](https://svelte.dev/), a new framework that I wanted to learn. Elder.js was the first thing I found that satisfied the criteria. 

So, let's try Elder.js, yeah?

## Documentation Woes

Learning how to use Elder.js is like learning on hard mode.

### Elder.js Wasn't a Great Beginner Course in SSG Usage

Not only did I want to learn Svelte, but I also wanted to learn SSG and I was using Elder.js to do so. I really made this harder than it needed to be. My struggle with learning SSGs is documented [in my previous post](/blog/you-are-probably-being-misled-by-static-site-generators).

The documentation is written by the engineers who wrote it and assumes everyone already knows how it works. For people who are up-to-date on web dev chops, this might be sufficient. But for me, this was a huge struggle.

The [README](https://github.com/Elderjs/elderjs#elderjs-an-seo-first-svelte-framework--static-site-generator) dives head-first into the deep-end by going in detail about key features. From the get-go it feels like joining in on a conversation midway through. Take this, for instance:

> **Straightforward Data Flow:** By simply associating a `data` function in your `route.js`, you have complete control over how you fetch, prepare, and manipulate data before sending it to your Svelte template. Anything you can do in Node.js, you can do to fetch your data. Multiple data sources, no problem.

This is the reading equivalent of gargling a fire-hose.

I haven't even been introduced to the basic strokes of what this framework produces and now I'm reading about really minute details about data flow. I also had to google terms like "partial hydration" and "shortcodes", making it extra esoteric for n00bs like me.

### The Ramp-Up Tutorial Was a Nightmare

I got a brief reprieve with the installation instructions. Getting a dev environment up and running only takes 4 tiny command line instructions. Great!

My progress ground to a halt immediately after. Once I had the website up and running, browsing to `localhost` dumped me here:

![What you see for a fresh Elder.js install](/articles/elderjs-tutorial-landing.png)

I was overwhelmed trying to figure out where to start reading. This is the first time I've come across an actively hostile page layout. I think I am supposed to click the card that says "Getting Started with Elder.js", but if I do, it takes me to this page:

![Getting Started immediately leads you to a 4 way fork in the road!](/articles/elderjs-tutorial-getting-started.png)

And then I hit a 4-way fork in the road. But wait, is this giving you deja-vu as well? This list of examples is identical to the page I just left!

### A Beginners Guide to Reading Elder.js Documentation

##### 1. Skip "Getting Started" and Read This Specific Section

![The real 'Getting Started' section.](/articles/elderjs-tutorial-start.png)

This section of the homepage, immediately underneath the place that says "Getting Started" is where I think you should start. It's a quick outline of the site-map and an `npm` cheatsheet.

And then STOP! Everything below the start point is dense, inscrutable reference about hooks. I got caught up in this diagram and glossary, trying to keep up with all the terms, lost in a maze of links, until my brain almost exploded. I would not recommend doing that.

![Beware all who enter!](/articles/elderjs-tutorial-reference.png "This is like experiencing a lovecraftian horror.")

This doesn't belong in the middle of a tutorial.

##### 2. Go to the Simple and Blog pages

Doing these two examples in the 4 way fork will give you some idea of how to modify the website as a developer. This gives you a taste of the program flow.

At this point, I had some idea of how the system worked. I change some files around and nudge some text, and it changes when I refresh. Most of the code was still a black box, but at least I found a feedback loop.

##### 3. Try and Figure Out the Overall Program flow 

This is the hardest part because all the information is there but scattered everywhere.

Remember the diagram I mentioned earlier?

![The Elderjs Hook Interface Diagram](/articles/elderjs-tutorial-chart.png "This one.")

Pay close attention to this particular part of the diagram:

![Important Lifecycle Information](/articles/elderjs-tutorial-lifecycle.png "Honestly, a modified version of this chart should be the second thing you read.")

The server runs through all these functions in this order every time the user requests a page. Note also how there's boxes for `data` and `request` function calls? *These* are the things mentioned by the `README` that you need to implement to add your project specific code.

I recommend playing around with these functions now.

##### 4. Read the rest of the "Getting Started" page

The "Getting Started" page has all the dense, in depth information that only makes sense once you've absorbed all the other context. Ironically,  I feel like this should be called the "Read this Last" page.

### Mix up All the Fragments and Put them Together in Your Mind

So at this point, it's almost 12 hours later. I've been reading stuff, clicking furiously back and forth, scratching my head, taking a break to eat dinner, and revving up my brain until it redlined.

Finally, at nearly midnight, everything clicked.

I took all the terminology--all the little bits and pieces about hooks, data, requests, the big chart--and I now had it all nicely arranged in my head. Suddenly it was so simple! I just wish it didn't require an entire day of programming archeology to achieve this...

## The Price of High Cognitive Load

It was like reading [Judith Butler](https://en.wikipedia.org/wiki/Judith_Butler) or something. There's this thing in philosophy--It's trendy to write *insane* run-on sentences to make things purposefully hard to understand. It's because they want the comprehension of their text to come to you like fragments in a dream you had. They want the reader to actively have to piece things together in their minds. It has something to do with impressionism or whatever, I don't get it.

Take this, for example:

> [W]e must recognize that ethics requires us to risk ourselves precisely at moments of unknowingness, when what forms us diverges from what lies before us, when our willingness to become undone in relation to others constitutes our chance of becoming human. To be undone by another is a primary necessity, an anguish, to be sure, but also a chance--to be addressed, claimed, bound to what is not me, but also to be moved, to be prompted to act, to address myself elsewhere, and so to vacate the self-sufficient "I" as a kind of possession. If we speak and try to give an account from this place, we will not be irresponsible, or, if we are, we will surely be forgiven.
>
> <p class="text-right mr-6">-- Judith Butler</p>

What even *is* that?!? Is this what it feels like to have ADHD? I got the same feeling reading the Elder.js documentation and I found that to be very intriguing. I don't think they intended the documentation to have this affect.

> This kind of writing is like grossly inefficient code -- as I read it I can almost feel my brain overheating from all the unnecessary CPU cycles running in the background.
>
> <p class="text-right mr-6">-- Jake Romero [on Judith Butler]</p>

You could say that again, [Jake](https://www.bradford-delong.com/2011/12/dylan-matthews-smack-down-judith-butler.html). It's uncanny how someone can describe so precisely what I was feeling at the time.

## My Suggestions to Fix the Documentation

Ok, enough of me shitting on this poor guy's project. Elder.js is pretty powerful once you figure out how to use it. After all, they used it to make [ElderGuide.com](https://elderguide.com/), which is an awesome website.

![ElderGuide screenshot](/articles/elderjs-elderguide-widgets.png "This is a static site! Look at all this neat information. This is nuts!")

I think almost all the problems I have with it lie with the documentation. Here's what I would do to fix that:

### Improve the Reading Order

Don't overwhelm the reader with so many links to click on! I don't think I've ever been more confused when visiting a website. I had no idea as to which thing I should read first and which I should read next.

### Detangle the Site-Map

Make the tutorial **one** page that the user reads from top to bottom.

* First, installation commands
* Next, npm cheatsheet
* Server/client lifecycle loop diagram
* Then the "4-way fork" (list of examples)

The examples should be in order of increasing complexity and the contents scrubbed of references to glossary words and links to other pages for clarity.

### Implementation Details Last

NOW you can describe the power of hooks and modules and shortcodes and request details here. By now users should be familiar with enough jargon to not be confused.

### Push Everything Else into a Wiki-Style Reference

Lastly, take the chart, and glossary, and long unnecessary digressions about customizations and deployment and put it into a Wiki-style reference. Make each page start with a human readable header like "How do I do [x]?".

## Light at the End of the Tunnel?

Okay, whew, now that *that's* done, I can finally get to work, right?

WRONG!

I started modifying the Blog example and found that none of my changes were taking effect. "Did I really understand what I read?", I thought. I change the file, refreshed, reversed the changes, reverted source control, and it just still didn't behave as I expected!

I eventually did a google search and found [this bug](https://github.com/Elderjs/elderjs/issues/218#event-6170969909):

![Description of Elder.js Caching Issue](/articles/elderjs-bug.png "There is some overly aggressive caching happening is my guess.")

A caching bug in non-Windows computers! I was using Fedora Linux and this was happening to me. The bug made this software unusable for me!

A couple weeks after I came across the open bug, it was fixed. Unfortunately by then I'd tapped out and started looking to use something else...
