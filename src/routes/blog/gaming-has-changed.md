---
title: Gaming has Changed
author: Cory Parsnipson
summary: "\"I really liked it when Cory talked about portable video game consoles for a looooong time.\" I made a decision to resume working on my Raspberry Pi portable project, and I talk about the portable gaming scene and how it's been changing very fast for these past couple of years."
seo_image: /articles/gaming-has-changed.jpg
date: Sun Jun 26 02:09:23 PM PDT 2022
categories:
  - fun
  - video games
  - raspberry pi
  - electronics
  - work diet
  - mental health
---

<script>
  import WorkDiet from '$lib/components/charts/WorkDiet.svelte';
</script>

Just popping in here to say I made a new post in my [Raspberry Pi game console project log](https://forums.somethingawful.com/showthread.php?threadid=3947328&pagenumber=10#post524293346). I went on a somewhat unplanned hiatus and decided to come back.

![Solid Snake playing a Nintendo Switch](/articles/gaming-has-changed.jpg "Kept you waiting, huh?")

I had previously finished making a fully working prototype during what I called it "Phase 1". I was working on "Phase 2" between December and February, when I decided to stop because the stress of trying to make things work while watching my savings run out was too much for me.

In between that time and now, I started this blog and came up with the *work diet* trying to figure out how to sustain myself so that I can continue working on the RPI project without such harsh constraints.

## Gaming has Changed?!

For those that aren't knee-deep in the portable gaming world, it's having a bit of a renaissance right now. I believe the renewed interest in portable gaming started with the huge success of the Nintendo Switch, which was then recently matched by the extremely prolific Steam Deck handheld. 

![The Steam Deck](/articles/steam-deck.jpg "Based on Valve's claims, this is the second coming of Christ")

I think in the past couple years, there's been a shift to thinking of portable game consoles as a serious endeavor and not a watered-down experience for kids. This is pretty funny to me, because I've noticed more people ragging on the graphical or performance capabilities of portable devices, as if the CPU and memory constraints don't exist anymore.

### The Low-End Enthusiast Segment

Many third party companies have sprung up to capture the zeigeist that the Nintendo Switch started. Today, you can buy a lot of 3rd party offerings much cheapter than the Switch to emulate "retro" games. The Retroid Pocket and Anbernic 552 come to mind. Many of these product lines actually predate the Switch, being inspired by Gameboy and Nintendo DS hardware.

![The Retroid Pocket 2](/articles/retroid-pocket.webp "Retroid Pocket 2")

This is a small, Gameboy sized console for retro games up to the PS1 generation.

![Anbernic RG552](/articles/anbernic-rg552.jpg "Anbernic RG552")

This looks small, but the Anbernic RG552 is actually slightly larger than the Nintendo Switch and is supposed to be able to emulate PS2, Gamecube, and Wii games. (Don't quote me on that.)

### The Rise of Flagship Portable Gaming Consoles

The frenzy only ramped up after the Steam Deck was announced. Now every few months, there's a Steam Deck competitor with an enormous screen and has essentially a windows PC inside of it attempting to emulate everything under the sun.

![OneXPlayer](/articles/onexplayer.jpg "OneXPlayer")

This is one of the OG premium windows gaming PC portables. It actually came out before the Steam Deck, I think, but has since been superceded by a bunch of newer products that promise similar performance at a much lower price. (This thing is like $1500, or something.)

![The Aya Neo Air](/articles/aya-neo-air.jpg "Aya Neo Air")

As of the time of this writing, here's a second gen, sleek portable announced by a company called Aya Neo.

### The Hipster Segment

Like audiophiles, there's a lot of retro gaming snobs who care about screen resolution or swear they can see their perfectly emulated game jittering and claim that the device is unplayable. For those people, there's companies like Analogue that are trying to recreate the hardware using FPGA techniques for that ultra hi-fi experience.

![The Analogue Pocket](/articles/analogue-pocket.jpg "The Analogue Pocket")

Behold! The ultimate game boy. It can perfectly emulate Gameboy, Gameboy Color, and Gameboy advance games. Also I think WonderSwan games too. Supposedly they will come out with new emulation cores that will let you play more games in the future.

### Where Does My Project Fit In Here?

It's kind of a bummer, since I feel like I started this project juuust before the explosion happened, and now I'm getting left behind. But that's what happens for a hobby project done by a single person. I guess I could make it open source and open it up to a modding community.

![The RPI Phase 1 Prototype](/articles/rpi-prototype.jpg "Mine. The size of an alarm clock.")

I will take the advice of many people who just say to follow your passion, and then the success will come. Regardless of outcome, I still want to make something and I think it'll be cool to see the finished product in my hands. I can figure out all the other stuff as I go.

## The Plan Going Forward

As I said in my forum post, I'll probably try and do at least a once a month cadence, just to pace myself and avoid having long breaks of nothing.

As an interesting aside about the work diet, I said all that stuff about working on everything simultaneously but I put the RPI project on the backburner to try and speed up the website development and other stuff. I don't think I should have done that. At times I could feel it making me depressed since I was only working on text editing and writing and not more of the fun programming or design stuff that I like.

So I'll try juggling the RPI stuff, blogging, website development, and part time survival work from here on out. Not having a 40+ hour a week job really lets you stuff a whole lot in there, doesn't it?

<WorkDiet show_hours={false} legend={true} data=
  {[
    [
      { item: "Uber driving", hours: 0, status: "inactive" },
      { item: "freelancing", hours: 0, status: "discarded" },
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
      {item: "RPi game console", hours: 0, status: "active"},
    ]
  ]} />

I want to also specifically mention how much energy I've been devoting to properly making time for myself and to keep up my mental health. I think this is really important because I've had to actively combat burn-out for a great majority of my adult career. I hope I can replace sources of stress with some creative outlets soon. The struggles of being an indie creator are too real.

Thanks for reading!
