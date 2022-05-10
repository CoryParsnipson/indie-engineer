<script>
  export let title = "Pie Chart";
  export let radius = 50;
  export let data = [{
    name: 'Item 1',
    amount: 2, // not a percentage, put in any number and all entries will be normalized
    color: 'green', // if not set, will be assigned a random color
  }, {
    name: 'Item 2',
    amount: 13,
    color: 'cornflowerblue',
  }, {
    name: 'Pineapple',
    amount: 1,
    color: 'purple',
  }];

  let raw_total = 0;
  $: data.forEach(item => raw_total += item.amount);

  $: processed = data.map((item, index) => {
    item.percent = Math.ceil(item.amount / raw_total * 100);
    item.dash_array = calculateDashArray(item.percent);

    if (!item.color) {
      item.color = undefined;
    }

    return item;
  });

  function calculateDashArray(percent) {
    let half_circumference = Math.PI * radius;
    let arc_length = Math.ceil(half_circumference * (percent / 100));

    return `0 ${half_circumference - arc_length} ${arc_length}`;
  }

  function calculateRotation(index) {
    let acc_percent = 0;
    for (let i = 0; i < index; ++i) {
      acc_percent += processed[i].percent;
    }

    return `-${acc_percent / 100 * 360}deg`
  }
</script>

<div class="flex flex-col">
  <p class="text-3xl text-center m-0">{title}</p>
  <div class="flex gap-5 p-4">
    <svg width={"100%"} viewBox="0 0 100 100" class="basis-3/5 p-4">
      {#each processed as item, idx}
        <circle
          r={radius / 2}
          cx={radius}
          cy={radius}
          fill={'transparent'}
          stroke={item.color}
          stroke-width={radius}
          stroke-dasharray={item.dash_array}
          class="origin-center"
          style="transform: rotate({calculateRotation(idx)})"
        />
      {/each}
    </svg>

    <div class="flex flex-col items-stretch basis-2/5 border-2 border-dashed border-cream-200 p-3">
      <p class="text-center bg-cream-100 mb-4">Legend</p>
      {#each processed as item}
        <div class="flex gap-2 items-center">
          <svg width="10px" height="10px" viewBox="0 0 100 100">
            <rect width="100%" height="100%" fill="{item.color}" />
          </svg>
          <p class="m-0">{item.name}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
