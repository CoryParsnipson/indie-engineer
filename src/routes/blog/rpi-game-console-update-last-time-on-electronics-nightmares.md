---
title: "RPI Game Console Update: Last Time on Electronics Nightmares"
author: Cory Parsnipson
summary: Wake up, babe--A new RPI game console log just dropped! I've designed my own PCB and it's time for me to start assembling them. It's important to take time to work on fun and interesting work. I hope I can do more of this in the future.
seo_image: /articles/rpi-switches-cover.jpg
date: Mon Jul 18 12:46:32 PDT 2022
categories:
  - electronics
  - raspberry pi
  - rpi
  - mental health
---

I made another post in my game console project log. Check it out [here](https://forums.somethingawful.com/showthread.php?threadid=3947328&pagenumber=10#post524853722).

## Assembling my PCBs

A while ago, I made my first printed circuit board (PCB) using KiCAD and sent it out to [JLCPCB](https://jlcpcb.com/) to have it manufactured. When it came in the mail, I never opened the package--until today.

![My PCB designs from JLCPCB](/articles/pcbs.jpg "A USB Hub design and two types of controller button breakout boards")

I soldered some tactile switches to the board. This uses through-hole switches that are cheap and commonly available. You'll see this type of button in a lot of DIY or hobby electronics projects.

![Tactile switch footprint PCB](/articles/abxy-pcb-buttons.jpg "Simple switches, but uses a lot of space")

What I really wanted to test out was whether or not I could make my own metal dome contact traces and have the buttons built directly into the board. This is how they do it in many commercial electronics products, including the Nintendo DS and Nintendo Switch.

![Metal dome contacts test PCB](/articles/dpad-pcb-buttons.jpg "Compact, but uses fancier and more complicated components")

For the third design, I made a simple USB hub. This one is the most complicated design and I made it to learn how to solder surface mount components.

![USB hub pcb](/articles/usb-hub-pcb.jpg "The bare USB hub pcb. Note the SSOP footprint for the USB controller chip.")

I'll be working on this next. Fingers crossed!

That's the post in a nutshell. The [full post](https://forums.somethingawful.com/showthread.php?threadid=3947328&pagenumber=10#post524853722) has many more interesting details that I left out here.

## Zen and the Art of Electronics

I'm making good on my promise to start doing electronics again. I've underestimated the importance of working on something fun and intellectually stimulating. After months of grinding through text editing and driving for Uber, I recall that picking up the soldering iron had a profound effect on my mental state. It felt like taking a drink of water after making a long trek through the desert.
