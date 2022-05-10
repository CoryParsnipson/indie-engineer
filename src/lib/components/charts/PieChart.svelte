<script>
  import newUniqueId from 'locally-unique-id-generator';

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

  let tooltip; // hovers next to cursor on mouse over
  let chart; // reference to pie chart
  let prev_component = undefined;

  let raw_total = 0;
  $: data.forEach(item => raw_total += item.amount);

  $: processed = data.map((item, index) => {
    item.index = index;
    item.id_class = `item-${newUniqueId()}`;

    item.percent = Math.ceil(item.amount / raw_total * 100);
    item.dash_array = calculateDashArray(item.percent);

    if (!item.color) {
      item.color = getRandomColor((index - 2) % data.length, index);
      item.color_hover = getRandomColor((index - 2) % data.length, index, 75, 55);
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
    if (processed && processed[index] && !processed[index].rotation) {
      let acc_percent = 0;
      for (let i = 0; i < index; ++i) {
        acc_percent += processed[i].percent;
      }
      processed[index].rotation = -1 * acc_percent / 100 * 360;
    }

    return `${processed[index].rotation}deg`
  }

  function getRandomColor(seed, offset = 0, saturation = 63, lightness = 60) {
    const hue = seed * 137.508 + offset; // golden angle approximation
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function isInsideCircle(pos, origin) {
    let delta = { x: origin.x - pos.x, y: origin.y - pos.y };
    let displacement = Math.sqrt(delta.x ** 2 + delta.y ** 2);
    let effective_radius = chart.getBoundingClientRect().width / 2;
    return displacement <= effective_radius;
  }

  function getChartOrigin() {
    let r = chart.getBoundingClientRect();
    return {
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
    };
  }

  // get angle in degrees, 0 deg is the x axis going towards the right
  function getAngleOfMouse(mouse_pos) {
    let origin = getChartOrigin();
    let opposite = origin.y - mouse_pos.y;
    let adjacent = mouse_pos.x - origin.x;

    let rads = Math.atan(opposite / adjacent);
    let degs = 180 * rads / Math.PI;

    if (adjacent < 0 && opposite < 0) {
      degs += 180;
    } else if (adjacent < 0) {
      degs = 180 - Math.abs(degs);
    } else if (opposite < 0) {
      degs = 360 - Math.abs(degs);
    }

    return degs;
  }

  function findPieChartComponentByAngle(angle) {
    let component_span = 0;
    for (let i = 0; i < processed.length; ++i) {
      component_span += processed[i].percent / 100 * 360;
      if (angle < component_span) {
        return processed[i];
      }
    }

    return processed[processed.length - 1];
  }

  function showInfo(e) {
    let mouse_pos = { x: e.clientX, y: e.clientY};
    let chart_origin = getChartOrigin();
    if (!isInsideCircle(mouse_pos, chart_origin)) {
      return;
    }

    let mouse_pos_global = { x: e.pageX, y: e.pageY };

    // move tooltip to be next to cursor
    tooltip.style.left = mouse_pos_global.x + 15 + 'px';
    tooltip.style.top = mouse_pos_global.y + 15 + 'px';

    // use trig to figure out which component the mouse cursor is over
    // we can't use mouseover events because the SVG componenets have an
    // invisible circle of {radius} in the middle, screwing that all up
    // (this is necessary because it's a hack to show partial circles using
    // the stroke)
    let angle = getAngleOfMouse(mouse_pos);
    let component = findPieChartComponentByAngle(angle);

    // update contents of tooltip
    let tooltip_name = tooltip.getElementsByClassName('tooltip-name');
    if (tooltip_name.length) {
      tooltip_name[0].innerText = component.name;
    }

    let tooltip_data = tooltip.getElementsByClassName('tooltip-data');
    if (tooltip_data.length) {
      tooltip_data[0].innerText = component.amount_format;
    }

    // change component hover color (and return previous component hover color, if necessary)
    if (prev_component && prev_component.id_class != component.id_class) {
      let prev_component_el = document.getElementsByClassName(prev_component.id_class);
      if (prev_component_el.length) {
        prev_component_el[0].style.stroke = prev_component.color;
      }
    }

    let component_el = document.getElementsByClassName(component.id_class);
    if (component_el.length) {
      component_el[0].style.stroke = component.color_hover;
    }

    prev_component = component;

    // show tooltip
    tooltip.classList.remove('hidden');
  }

  function hideInfo(e) {
    if (prev_component) {
      let prev_component_el = document.getElementsByClassName(prev_component.id_class);
      if (prev_component_el.length) {
        prev_component_el[0].style.stroke = prev_component.color;
      }
    }

    tooltip.classList.add('hidden');
  }
</script>

<div bind:this={tooltip} class="absolute hidden inline-block drop-shadow-xl rounded-md py-1 px-2 bg-zinc-900">
  <p class="tooltip-name text-zinc-100 text-base m-0">Name</p>
  <p class="tooltip-data text-zinc-100 text-base m-0">Amount (Percent%)</p>
</div>

<div class="flex flex-col mb-8" style="{cssColors}">
  <p class="text-2xl text-center m-0">{title}</p>
  <div class="flex flex-col sm:flex-row gap-5 items-center sm:py-4">
    <svg
      on:blur={(e) => hideInfo(e)} on:mouseout={(e) => hideInfo(e)}
      on:focus={(e) => showInfo(e)} on:mousemove={(e) => showInfo(e)}
      width={"100%"} viewBox="0 0 100 100" class="sm:basis-1/2 p-8 sm:p-2">
      <circle bind:this={chart} r={radius} cx={radius} cy={radius} fill={'gray'} class="backing origin-center" />

      {#each processed as item, idx}
        <circle
          r={radius / 2}
          cx={radius}
          cy={radius}
          fill={'transparent'}
          stroke-width={radius}
          stroke-dasharray={item.dash_array}
          class="{item.id_class} origin-center"
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
          <p class="justify-self-end grow text-lg text-right m-0">{item.amount_format}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
