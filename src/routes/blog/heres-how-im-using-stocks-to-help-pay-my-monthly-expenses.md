---
title: Here's How I'm Using Stocks to Help Pay My Monthly Expenses
seo_title: Here's How I'm Using Stocks to Help Pay My Monthly Expenses
author: Cory Parsnipson
summary: It turns out I do already have a passive income stream--stocks! I never thought of this as a hobby, but more like a household chore. I took an inventory of my current portfolio to get a gauge of what the monthly income stream looks like. It's not much, but it's a promising start. I also ponder some ways to increase the amount of passive income by changing the composition of my portfolio somewhat. Detailed breakdown inside.
seo_image: /articles/stonks.png
date: Mon Apr 25 12:35:36 PM PDT 2022
categories:
  - stocks
  - finance
  - passive income
  - work diet
---

<script>
  import WorkDiet from '$lib/components/charts/WorkDiet.svelte';
  import PieChart from '$lib/components/charts/PieChart.svelte';
  import StackedBarChart from '$lib/components/charts/StackedBarChart.svelte';
</script>

I've been learning about and trading stocks for a long time. Up until now I've thought of it as "maintenance task", like cleaning your room or execising. But then I realized that this could count as a hobby and a potential source of passive income. Let's take a look at the entry on the bottom row labeled "stocks".

<WorkDiet show_hours={false} legend={true} data=
  {[
    [
      { item: "Uber driving", hours: 0, status: "inactive" },
      { item: "freelancing", hours: 0, status: "inactive" },
      { item: "tutoring", hours: 0, status: "inactive" },
      { item: "stocks", hours: 0.25, status: "passive" },
    ],
    [
      { item: "blogging", hours: 0, status: "inactive" },
      { item: "Etsy / Redbubble / Zazzle", hours: 0, status: "inactive" },
      { item: "real estate investing", hours: 0, status: "inactive" },
      { item: "streaming", hours: 0, status: "inactive"},
    ],
    [
      { item: "websites", hours: 0, status: "inactive" },
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

The best part of this is that I've already set everything up, learned all the background information, and now only spend a couple minutes a month monitoring and maintaining things. For this reason, it goes on the bottom, because everything is already operational.

## Making your Stock Portfolio Work for You

Money can come out of a portfolio for several reasons. The first is from interest and dividends. There's also capital gain distributions from mutual funds. And then there's capital gains from asset sales (e.g. when you sell a stock and reap the profits/losses). That last one happens when you actively change your portfolio composition. Unlike the first two, I want to avoid doing this as much as I can.

Below this point, I am specifically commenting on the portion of my portfolio that is outside my retirement account, since nothing is going in or out of it at the moment.

### Passive Income from Interest and Dividends

Interest is a regular payment made to people who own *bonds* and other fixed income assets for lending their money out. This works the same way as interest you get from a savings account. Dividends are another type of regular payment made to people who own a company's stocks. Dividends are how companies distribute a portion of their profit to shareholders. I don't receive any interest income but I do get dividends because I hold mostly stock and the mutual funds I bought that track bonds don't give interest (they are classified as dividends instead).

Based on last year's activity, I got about $252 per month in dividends. This number is an average because some mutual funds pay out monthly, others pay out once every six months, and a few pay annually on December 30th. The actual dividend amount also fluctuates slightly due to market conditions.

<PieChart title="Income Breakdown" legend="Per Month" amount_format={"${amount} ({percent}%)"} data={[{ name: "Stocks", amount: 200 }]} />

That's higher than I expected. Not bad for something that I'm already doing! This is about half my grocery bill for the month or almost an entire medical bill. The best part is it comes in without me having to lift a finger.

Also, you might notice that the chart says $200 instead of $252. I earmarked $200/month as usable income because the dividends are actually taxable. So it would be smart to sock some of it away for tax season. (Sigh!) I figure 20% might be a reasonable estimate for now.

### Passive Income from Distributions and Capital Gains

Mutual funds may also give distributions in the form of long term and short term capital gains. Mutual funds are stipulated by law to distribute almost all the capital gains they make from selling their underlying stock to their shareholders.

A large chunk of mutual fund distributions were returned to me in December of last year. This is actually bad for me because capital gain distributions are taxable and they reduce the share price (NAV) of the mutual fund by the amount of money that was distributed. The latter isn't actually important in the grand scheme of things but I find to be personally unpleasant.

Up until now I've actually just been reinvesting all of this by plowing it back into the mutual funds it came from. Perhaps I will just withdraw it starting this year? I didn't include it in the income charts above because all of it comes in literally on December 31st, so I'd rather not have to rely on it if I don't have to. This amount is also somewhat unpredictable because it is a percentage of the mutual fund's profits for the year. Still, it may be helpful in a pinch.

## Folding Stocks into my Work Diet

![A subway system map](/articles/stock-roadmap.png)

There are a couple really hard decisions I need to make. I could try to keep things the way they are now and enjoy a $200/month income for the foreseeable future. Or I could try and rebalance some things to squeeze some more out of it.

Is $200 a month the best I can do? Definitely not. Prior to now, my goals were saving for retirement. This shows in the portfolio because when you want to grow a nest egg for retirement, the goal is to reduce your tax inefficiency as much as possible. This translates to keeping dividends, distributions, and capital gains very low and prioritizing appreciation of your principle investment through compounding. Which is what I tried to do.

The capital gain distributions that happen to mutual funds came as a suprise to me the first time it happened. But hey! You live and you learn. I left it that way because I had a job so it wasn't as big of a problem it is now and also because I don't know of a way that I could easily resolve this for my personal situation.

### Closed End Funds?

I recently heard about something called "Closed End Funds" that provide much higher monthly yield than the things I have now, so I might think about trying to ease that into the portfolio to bolster dividend amount. Some research and calculation is necessary, but if it turns out to be favorable, I could replace the bond mutual funds I have with these instead. That'll be a whole different article.

## Current Status

Well, after taking an inventory, I think I'm off to a good start. I still feel like I'm in an unstable situation, understandably.

<PieChart title="Income Breakdown" legend="Per Month" amount_format={"${amount} ({percent}%)"} data={[{ name: "Stocks", amount: 200 }]} />

This chart is just begging for some more items to go on here. I hope to keep adding to the collection for some peace of mind.

<StackedBarChart title={"Monthly Total"} legend={''} data={[{ month: 'April', stocks: 200}]} />

Looks like I got my work cut out for me...
