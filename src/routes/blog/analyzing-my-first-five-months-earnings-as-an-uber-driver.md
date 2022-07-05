---
title: Analyzing my First Five Months Earnings as an Uber Driver
author: Cory Parsnipson
summary: I gave Uber driving a try to support myself while I get other things up and running. I wasn't sure if being a driver would pay enough money as I've heard a lot of stories about Uber. I give my initial experience and impression of whether or not this is a viable income stream.
seo_image: /articles/uber-earning-chart.png
date: Tue Jul  5 01:18:11 PM PDT 2022
categories:
  - uber
  - uber driving
  - cars
  - menial jobs
  - stats
  - work diet
---

<script>
  import PieChart from '$lib/components/charts/PieChart.svelte';
  import StackedBarChart from '$lib/components/charts/StackedBarChart.svelte';
  import WorkDiet from '$lib/components/charts/WorkDiet.svelte';

  import DollarsPerHour from '$lib/components/charts/uber/DollarsPerHour.svelte';
  import DollarsPerMile from '$lib/components/charts/uber/DollarsPerMile.svelte';
  import TripsPerHour from '$lib/components/charts/uber/TripsPerHour.svelte';
  import DollarsPerMonth from '$lib/components/charts/uber/DollarsPerMonth.svelte';
</script>

The last time I was unemployed was in 2014. During that time Uber was exploding into the collective consciousness as the latest trendy startup to come out of Silicon Valley. Driving for Uber was mysterious and cool *and* you got paid for it.

Things have changed a lot since then. People have realized that Uber drivers are glorified taxi drivers with even lower profit margins. But, being unemployed once again, I turned to Uber as a familiar side-hustle to guarantee some quick cash. After about two weeks of background checks, inspections, and gathering documents I was all set to start driving.

![Screencap of Parasite Movie](/articles/parasite-driver.png "Me, driving to fulfill my greatest passion in life.")

One winter evening, I sighed deeply and let a stranger into my car.

## How Much I Make as an Uber Driver

Ok, first things first, how much do I make as an Uber driver? It's between $30 and $35 per hour, before tax, gas, and car maintenance cost. This is in the San Francisco Bay Area, so I imagine that it pays less almost everywhere else.

<DollarsPerHour />

### You Make What?! That's Actually a Lot!

Well hold your horses. It's not exactly a simple $35 an hour to make when you account for the many, many caveats:

##### Scheduling Around an Uber Shift is Really Hard

If I accept an hour+ trip going 50 miles somewhere, that'll take a while to come back from unless I eat the cost of gas on the return trip, passenger-less, just to be on time.

For that reason, I usually just consider driving to be an all day thing. The "true" dollars per hour is maybe much lower if you take the opportunity cost of that wasted time into account.

##### Uber Drivers are at the Mercy of Random-ness

The dollar per hour rate is dependent on being in the right area and accepting the right trips. This makes it feel like a constant struggle to make money.

It's a real drag on one's mental energy. Ever met an angry driver? This is probably the reason. They're pissed because they are constantly fighting against uncertainty.

##### You Have to Pay All Your Own Expenses

This has been highly publicized, because it should be a deal breaker for almost everybody. The thought of car expenses on a driver's income is scary. A single accident or breakdown can cost thousands, basically invalidating the past couple months of earnings. Not cool at all.

Also the increase in gas price directly translates to more hours of work per week to earn the same amount of money as before. This *really* sucks.

![Insane gas prices](/articles/gas-prices.jpg "California in a nutshell")

It's still better than most minimum wage jobs, I guess. Maybe I still prefer typing code and sitting in an air-conditioned room after all...

## A Closer Look at Earnings Data

I ended up gathering a lot of interesting data, so I prepared a bunch of charts.

### Dollars, Miles, and Hours are Tightly Correlated

The relationship between dollars, miles, and hours is surprisingly consistent. I was expecting earnings to be really dependent on luck. What I found is that over a certain number of hours (8-ish?), everything sort of evens out.

This is a really good thing, because now I can estimate how long it will take to earn a certain amount of money and how much gas I'll need. This is great for planning out my shifts.

### Dollars Per Hour

Let's take another look at this chart.

<DollarsPerHour />

Notice that there is a slow upward trend. This can be explained by me learning more tips and tricks to save gas and be more efficient at the job. I max out sometime mid-April where I remain steadily around the $30 - $35 range I mentioned before.

The second thing that I'm noticing is exactly how shafted I'm getting with respect to gas expenses...

### Dollars Per Month

I didn't know at first how much I could make, but the first day I went out in the evening and made about $60 in four hours. I figured this meant I could easily do about $100 per day (after gas). I find that it's pretty useful to think in terms of dollars per day after gas money is taken out.

<DollarsPerMonth />

Initially I drove two days a week and stopped only after I earned $100 (or $120-ish before gas). Doing $800 a month would put a big dent in my rent payment. You can see this number in February, where I made $1090. I managed to make a surplus of $200 through promotions and quest bonuses and overestimating the cost of gas a little.

#### Deciding on a Schedule

Almost halving my burn rate was good, but after February I got more ambitious. If I drove for a little longer, I could probably make $2,400 a month.

I tried different things in March and April. Sometimes I'd only Uber on the way to and from places I already needed to go. Other times I tried driving a few hours early in the morning or late at night. None of these things were that great. This is because shorter shifts are less lucrative and driving almost every day makes it feel like I'm working all the time.

Improvements to efficiency and taking longer shifts make it possible to achieve my goal driving 3 days a week making $200 a day ($240 before gas), or 2 days a week, making $300 a day ($360 before gas). Driving 2 days a week gives me a good break in between shifts, but the long days are pretty grueling. I either have to wake up early (6AM-ish), take a couple hours break midday, and work into the evening around 7-8PM, or start at 2-3PM and end at midnight.

### Dollars Per Mile

This is actually a pretty useful metric. In a nutshell, it basically tracks how efficient you are with your gas. The higher the better. If the number starts dropping, then I know I'm doing something wrong.

<DollarsPerMile />

There's a very shallow upward trend on this as I got more experience.

Since it is so close to $1 a mile, it is really easy to do some quick calculations. For instance, coupled with my car's range estimation, I have a pretty good estimate of how much gas I need to reach my goal for the day.

#### Dollars per Tank

My car's range is about 400 miles per tank. So because of the dollars per mile relationship, I know that I can make roughly 400 dollars if I eat through an entire tank of gas. Inversely, I know that I'm going to be using 75% of my tank to reach my goal of ~$300 a day.

If I am up to date on the latest gas prices, I can use this to calculate how much additional money I need to earn to pay for gas. Currently, it's about 50 dollars now that gas has breached $6/gal...

### Trips Per Hour

This metric doesn't mean much, but I was curious to see what it looked like. I was expecting this to be horizontal, and it pretty much is. 

<TripsPerHour />

Trips per hour can go down if you're spending too much time sitting around waiting for trips. Thankfully, I've only experienced that once in May. Interesting to see how that those two bad weeks are visible in the graph. Maybe it was just bad luck. On the other hand Omicron peaked during that time, so maybe people were just staying inside?

Trips per hour can also be influenced by how many short or long trips you accept. In general, it is more efficient and higher paying to only take long trips (i.e. lower trips per hour) to busy areas like the airport, but it is not possible to consistently do this.

### Uber is Probably Rate Limiting Uber Drivers

I think I'm hitting an artificial ceiling. This is purely speculation, but these numbers are so consistent that I suspect Uber's trip matching algorithm is purposely rate limiting drivers to distribute earnings evenly (more fairly?) among them. Perhaps the ceiling rate is determined by driver rating and prior history? Without it, I think my earnings would have a bigger variation.

Just something interesting to think about.

## Is Uber Driving *Really* Better Than an Office Job??

No, I don't think so... I can't recommend driving for Uber to anyone because they have to cover their own car expenses and that's completely not fair. However, I was surprised to learn that is it a viable method of supporting yourself. So that's interesting. 

Uber satisfies some very specific requirements that I have right now. I can just barely stay afloat by driving only 2-3 days a week, giving me the rest of that time to recoup and work on other projects. I can take shifts at my own discretion and I'm able to bring a laptop or book to work on stuff between passengers.

My most important criteria is free time. In terms of availability, this beats my old software engineering job. It was an unusually demanding one, now that I think about it. I spent many hours a day in meetings, requiring me to work later into the evening to make up for the lost time. I also had to deal with very passive aggressive coworkers and unachievable project milestones that really drained energy I needed for myself on nights and weekends. Nothing is worth consuming all your waking time for someone else.

## Current Status

I hope I won't need to drive people around for much longer. The longer this goes, the more a liability my car becomes. That and having to fight against the Uber app's game-ified systems is pretty dehumanizing.

<WorkDiet show_hours={false} legend={true} data=
  {[
    [
      { item: "Uber driving", hours: 0, status: "active" },
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

<PieChart title="Income Breakdown" legend="Per Month" amount_format={"${amount} ({percent}%)"} data={[{ name: "Stocks", amount: 200 }, { name: "Uber", amount: 2400 }]} />

<StackedBarChart title={"Monthly Total"} legend={''} data={[{ month: 'June', stocks: 200, uber: 2400}]} />

It's not glamorous, but I finally got some money coming in. I don't think anyone would consider this a successful career move, but I am now technically self-sufficient. Now that I have my expenses under control, I can concentrate on diversifying my income with something less laborious and more tech related.
