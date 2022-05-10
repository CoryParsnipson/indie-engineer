<script>
  export let title = "Pie Chart";
  export let legend = "Legend";
  export let radius = 50;
  export let data = [{
    name: 'Item 1',
    amount: 2, // not a percentage, put in any number and all entries will be normalized
    color: undefined, // if not set, will be assigned a random color
  }];

  // format to show in legend entry ('{<token>}' will be replaced with the amount)
  export let amount_format = "{amount} ({percent}%)";

  let raw_total = 0;
  $: data.forEach(item => raw_total += item.amount);

  $: processed = data.map((item, index) => {
    item.percent = Math.ceil(item.amount / raw_total * 100);
    item.dash_array = calculateDashArray(item.percent);

    if (!item.color) {
      item.color = getRandomColor((index - 2) % data.length, index);
    }

    item.amount_format = amount_format;
    item.amount_format = item.amount_format.replace('{amount}', item.amount);
    item.amount_format = item.amount_format.replace('{percent}', item.percent);

    return item;
  });

  $: cssColors = processed.map((item, index) => `--color${index}:${item.color}`).join(';');

  function calculateDashArray(percent) {
    let half_circumference = Math.PI * radius;
    let arc_length = (half_circumference * (percent / 100));

    return `0 ${half_circumference - arc_length} ${arc_length}`;
  }

  function calculateRotation(index) {
    let acc_percent = 0;
    for (let i = 0; i < index; ++i) {
      acc_percent += processed[i].percent;
    }

    return `-${acc_percent / 100 * 360}deg`
  }

  function getRandomColor(seed, offset = 0, saturation = 65, lightness = 61) {
    const hue = seed * 137.508 + offset; // golden angle approximation
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
</script>

<div class="flex flex-col mb-8" style="{cssColors}">
  <p class="text-2xl text-center m-0">{title}</p>
  <div class="flex flex-col sm:flex-row gap-5 items-center sm:py-4">
    <svg width={"100%"} viewBox="0 0 100 100" class="sm:basis-1/2 p-8 sm:p-2">
      <circle r={radius} cx={radius} cy={radius} fill={'gray'} />

      {#each processed as item, idx}
        <circle
          r={radius / 2}
          cx={radius}
          cy={radius}
          fill={'transparent'}
          stroke-width={radius}
          stroke-dasharray={item.dash_array}
          class="item{idx} origin-center"
          style="transform: rotate({calculateRotation(idx)}); stroke: var(--color{idx}, lightgray)"
        />
      {/each}
    </svg>

    <div class="flex flex-col items-stretch w-full sm:basis-1/2 border-2 border-dashed border-cream-200 p-2">
      <p class="text-center bg-cream-100 mb-4">{legend}</p>
      {#each processed as item}
        <div class="flex gap-2 items-center">
          <svg width="10px" height="10px" viewBox="0 0 100 100">
            <rect width="100%" height="100%" fill="{item.color}" />
          </svg>
          <p class="text-lg m-0">{item.name}</p>
          <!-- <p class="justify-self-end grow text-lg text-right m-0">${item.amount} ({item.percent}%)</p> -->
          <p class="justify-self-end grow text-lg text-right m-0">{item.amount_format}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
