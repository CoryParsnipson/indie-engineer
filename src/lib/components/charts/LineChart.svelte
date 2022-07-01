<script>
  import { LayerCake, Svg } from 'layercake';

  import AxisX from '$lib/components/charts/layercake/AxisX.svelte';
  import AxisY from '$lib/components/charts/layercake/AxisY.svelte';
  import Line from '$lib/components/charts/layercake/Line.svelte';

  // data is expected to be in this shape:
  // [ { '<xKey>': x0, '<yKey>': y0 }, { '<xKey>': x1, '<yKey>': y1 } ... ]
  export let data;

  export let width = "100%";
  export let height = "300px";

  export let title = "Line Chart";

  export let lineColor = 'cornflowerblue';

  export let xLabel = "";
  export let xKey = 'x';
  export let xDomain;
  export let xFormat = d => d;
  export let xTicks;
  
  export let yLabel = "";
  export let yKey = 'y';
  export let yDomain;
  export let yFormat = d => d;
  export let yTicks;
</script>

<p class="text-lg sm:text-xl text-center mb-3">{title}</p>
<div class:pl-14={yLabel} class="relative mb-14 pl-14" style="width: {width}; height: {height}">
  <p class="absolute top-1/2 -left-8 origin-top -rotate-90">{yLabel}</p>
  <LayerCake
    padding={{ bottom: 20, left: 40 }}
    x={xKey}
    y={yKey}
    yDomain={yDomain}
    data={data}
  >
    <Svg>
      <AxisX formatTick={xFormat} ticks={xTicks} />
      <AxisY formatTick={yFormat} ticks={yTicks} />
      <Line stroke={lineColor} />
    </Svg>
  </LayerCake>
  <p class="text-lg sm:text-xl text-center my-3">{xLabel}</p>
</div>
