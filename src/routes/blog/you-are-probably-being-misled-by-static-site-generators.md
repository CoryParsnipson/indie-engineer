---
title: You are Probably Being Misled About What Static Site Generators are Good for
author: Cory Parsnipson
summary: Starting a blog is next on the list. Should I use Wordpress and have something up and running in 3 hours? Of course not! That would be too easy. I used this opportunity to figure out what a static site generator was and, boy, I did not like what I saw. If you are thinking of using one, read this. It'll explain EVERYTHING.
seo_image: /articles/ssg-cover.png
date: Tue Jun  7 09:51:04 PM PDT 2022
categories:
  - coding
  - programming
  - web development
  - work diet
---

<script>
  import WorkDiet from '$lib/components/charts/WorkDiet.svelte';
</script>

So the next item on the agenda is to get back into web development because that seems like the best shot at hitting the ground running. The first thing I want to make is a blog to document all the stuff I'm doing. (Spoiler alert: it turned out to be *this* blog!)

I also know that blogs are popular projects to use static site generators (SSGs) for so maybe it's time to learn about static site generators?

<WorkDiet show_hours={false} legend={true} data=
  {[
    [
      { item: "Uber driving", hours: 0, status: "inactive" },
      { item: "freelancing", hours: 0, status: "inactive" },
      { item: "tutoring", hours: 0, status: "inactive" },
      { item: "stocks", hours: 0.5, status: "passive" },
    ],
    [
      { item: "blogging", hours: 0, status: "wip" },
      { item: "Etsy / Redbubble / Zazzle", hours: 10, status: "paused" },
      { item: "real estate investing", hours: 0, status: "inactive" },
      { item: "streaming", hours: 0, status: "inactive"},
    ],
    [
      { item: "websites", hours: 0, status: "wip" },
      { item: "apps", hours: 0, status: "inactive" },
      { item: "APIs", hours: 0, status: "inactive" },
    ],
    [
      { item: "art", hours: 0, status: "inactive" },
      { item: "making videogames", hours: 0, status: "inactive"},
      { item: "3D modeling", hours: 0, status: "inactive" },
    ],
    [
      {item: "RPi game console", hours: 0, status: "paused"},
    ]
  ]} />

*Sidenote:* I added a new status called *Work in Progress* to show that I'm working on something, but in the early stages so there isn't anything "operational" yet.

## So What Exactly *is* a Static Site Generator??

Since 2011-ish, it feels like every other new framework was touted as a static site generator made specifically to solve all your problems and tuck you into bed at night. You couldn't go five minutes without hearing the cool kids namedrop software packages like [Hugo](https://gohugo.io/), [Gatsby.js](https://www.gatsbyjs.com/), and [Jekyll](https://jekyllrb.com/). I personally remember trying to figure out what all the fuss is about and being super confused by their vague marketing. 

Here's the best definition I could find, courtesy of [CloudFlare](https://www.cloudflare.com/learning/performance/static-site-generator/#:~:text=A%20static%20site%20generator%20is,to%20users%20ahead%20of%20time.):

> A static site generator is a tool that generates a full static HTML website based on raw data and a set of templates. Essentially, a static site generator automates the task of coding individual HTML pages and gets those pages ready to serve to users ahead of time.

The concept is simple, but marketing buzzwords and hype you find around the net really muddy the waters. I think that's a problem.

## What are Static Site Generators Good for?

Now this is my main beef with the whole fad. I put *"what are static site generators good for"* into Google and I didn't find any answers that I thought were useful. Here's what I did find:

### Pros of Static Site Generators (A First Look)

* Extremely fast performance
* Very secure
* Good for blogs and other applications that display data which changes infrequently
* SEO optimized

Sounds good... But wait! That's not the full story.

### More that Meets the Eye

My main source of frustration was that the articles I read had no explanation for why the benefits existed. This is bad because I wanted to know when I should choose to use SSGs for my projects and what I found didn't answer any of my questions. In hindsight, I was missing a crucial piece of information:

An SSG gives you a static site (duh!). A static website consists of html files, css, and a pinch of javascript. The server receives HTTP requests and returns the file at the destination of the request and nothing else.

### Understanding the Underlying Principle

And that's the whole secret! This entire movement is just returning to the simpler times of serving html files. The slight twist to the formula is that you're using a script to compile your data into the final product so if you want to make changes, you can skip the tedium of changing all the boilerplate by hand by rerunning the script. **This is the one true benefit an SSG offers**.

Once you know this information, all the pros and cons made sense to me. All of the hype is literally just people describing the benefits of an old website or emphasizing the disadvantages of certain dynamic websites.

## Static Site Generators in Practice

With this in mind, I ran into so many headaches caused specifically by trying to contort my work into the SSG format. Here's what I wish I knew before I started:

### My Requirements Outgrew Static Sites Almost Immediately

As I was building the blog, I realized that the core features were a good match, but I would quickly "outgrow" the SSG the minute I wanted to do anything different. For instance, what if I wanted to add a mailing list sign-up form? I consider this a pretty basic feature.

Remember how static sites were supposed to be fast and secure? This is because the server is only serving html files and not handling API requests or performing database operations, etc. There are no avenues for user input.

They gain in performance by giving you *less* capability.

This means **you can't use POST requests from static sites**. Maybe this is obvious but think of all the things that it takes off the table. No forms! So how do I add a sign-up form?

The solution to is to spend money, of course.

### Static Site Generators Can Get Expensive Really Quick

Interestingly, you can get your static site hosted for FREE somewhere such as [Github Pages](https://pages.github.com/), [Vercel](https://vercel.com/), [render](https://render.com/), and [carrd](https://carrd.co/). But companies do this because static sites can be used as loss-leaders to lock customers into their ecosystems.

When integrating 3rd party API endpoints and serverless functions to add those fancy non-standard features, you are severely constrained to what kinds of things you can integrate as a static site. Remember, no POST requests going *to* your website.

![People don't manage servers anymore, they pay for different hosting addons](/articles/mailgun-pricing-tiers.png "Better make your blog profitable fast. Sheeesh!")

So you can only use third party packages that offer their own hosted endpoints, which usually comes with a monthly fee. I find this to be pretty ridiculous since I'm used to just implementing the API call myself in Django or something and hosting it on Heroku for free.

### IMO, A Blog is NOT a Good Candidate for SSGs

The last straw was when I wanted to make an API hook to send out an email whenever I published a new blog post. This seemed to be conceptually simple, but the static site arrangement made this much more difficult than it needed to be.

Because new blog posts are made by creating markdown files and adding them to the git repository and pushing, adding a webhook for this event is quite difficult.

Your current options are to use a third party endpoint and then accept that certain things will have to be done manually, or switch to a dynamic website, which is very easy to do in something like Wordpress.

### Informational Websites ARE a Good Candidate for SSGs

For example, displaying the schedule for the bus stops would be a great application for a static site generator. You can keep the schedule data in a JSON file directly in the git repository and, assuming that the schedule changes maybe only once or twice a year, you wouldn't have to change the data much. And there's no need to fragment the data depending on which user is viewing it.

Other examples of this could be [IMDb](https://www.imdb.com/) (just the movie info, not the community features) and statistics websites like [paimon.moe](https://paimon.moe/).

### Portfolio Websites ARE a Good Candidate for SSGs

Small businesses commonly need an extremely simple website to have an online prescence. These sites typically only need to have a few sentences describing what the company offers, a few photographs, and a contact form. A static site generator coupled with an email form submission service would be perfect for this.

## Lessons Learned

Given the examples above, I hope that's enough to make an educated guess for good static site candidates. If your website shares more in common with a dynamic website--i.e. user generated content, requiring API endpoints and database interactions, then the answer is "no". If your website is an informational or portfolio website, then maybe the answer is "yes".

The problem that I have with static site generators is that everyone hawking them refuses to say what their pros and cons are. "Can I do *[x]* with a static site generator?" The answer will never be *no*, just follow this 20 step process of bending over backwards and pay a monthly fee for a few services. By that point, it'll be better in every way to just do it the "normal" way with a dynamic website.


I would hesitate to recommend static site generators because in my opinion, most of the time they aren't a good fit for the job. It's a tool that can solve a specific set of problems but for some reason is being shoved into every corner of the web development space. I found myself having to redo everything in a different tech stack once the requirements changed.
