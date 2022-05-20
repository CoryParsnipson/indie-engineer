<script>
  import { LayerCake, Svg, flatten } from 'layercake';
  import { stack } from 'd3-shape';
  import { scaleBand, scaleOrdinal } from 'd3-scale';
  import { format, precisionFixed } from 'd3-format';

  import BarStacked from '$lib/components/charts/layercake/BarStacked.svelte';
  import AxisX from '$lib/components/charts/layercake/AxisX.svelte';
  import AxisY from '$lib/components/charts/layercake/AxisY.svelte';

  export let title = "Bar Chart";
  export let legend = "Legend";

  export let xKey = [0, 1];
  export let yKey = 'month';

  export let showY = false;
  export let xDomain = [0, 2400];

  export let data = [
    { month: 'Feb', apples: 240, bananas: 12, cherries: 142, strawberries: 177 },
    { month: 'March', apples: 332, bananas: 46, cherries: 2, strawberries: 180 },
  ];

  const series_names = Object.keys(data[0]).filter(d => d != yKey);
  data.forEach(d => {
    series_names.forEach(name => {
      d[name] = +d[name]; // force convert every entry to number, discards invalid conversions
    });

    let total = 0;
    for (const [k, v] of Object.entries(d)) {
      if (!isNaN(v)) {
        total += v;
      }
    }
    xDomain[1] = Math.max(xDomain[1], total);
  });

  const bars_names = data.map(d => d[yKey]);
  const series = (stack().keys(series_names))(data);
  const series_colors = series_names.map((name, idx) => getRandomColor(idx - 2, idx % series_names.length));
  const formatTickX = d => d;

  // https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
  function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function getRandomColor(seed, offset = 0, saturation = 63, lightness = 60) {
    const hue = seed * 137.508 + offset; // golden angle approximation
    return hslToHex(hue % 360, saturation, lightness);
  }
</script>

<div class="chart flex flex-col gap-5 mb-12">
  <p class="text-center text-2xl mb-0">{title}</p>
  <div class="w-full h-[100px] pb-4 mb-6" class:pl-16={showY}>
    <LayerCake
      x={xKey}
      y={d => d.data[yKey]}
      z={'key'}
      xDomain={xDomain}
      yScale={scaleBand().paddingInner([0.25]).round(true)}
      yDomain={bars_names}
      zScale={scaleOrdinal()}
      zDomain={series_names}
      zRange={series_colors}
      flatData={flatten(series)}
      data={series}
    >
     <Svg>
        <AxisX
          baseline={true}
          snapTicks={true}
          formatTick={formatTickX}
        />
        <AxisY
          gridlines={false}
          formatTick={showY ? d => d : d => ''}
        />
        <BarStacked />
      </Svg>
    </LayerCake>
  </div>

  <div class="flex flex-col items-stretch w-full border-dashed border-cream-200 p-2"
    class:border-2={legend}
  >
    {#if legend}<p class="text-center bg-cream-100 mb-4">{legend}</p>{/if}
    <div class="flex flex-wrap gap-x-12">
      {#each series_names as item, index}
        <div class="flex gap-2 items-center">
          <svg width="10px" height="10px" viewBox="0 0 100 100">
            <rect width="100%" height="100%" fill="{series_colors[index]}" />
          </svg>
          <p class="text-lg m-0">{item}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(.chart .tick text) {
    @apply font-serif text-xl;
  }
</style>
