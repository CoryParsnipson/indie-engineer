<script>
  import { Html, LayerCake, Svg } from 'layercake';

  import AxisX from '$lib/components/charts/layercake/AxisX.svelte';
  import AxisY from '$lib/components/charts/layercake/AxisY.svelte';
  import MultiLine from '$lib/components/charts/layercake/MultiLine.svelte';
  import Labels from '$lib/components/charts/layercake/GroupLabels.html.svelte';
  import SharedTooltip from '$lib/components/charts/layercake/SharedTooltip.html.svelte';

  // data is expected to be in this shape:
  // [ { '<xKey>': x0, '<yKey>': y0 }, { '<xKey>': x1, '<yKey>': y1 } ... ]
  export let data;
  export let flatData;

  export let width = "100%";
  export let height = "300px";

  export let title = "MultiLine Chart";
  export let show_labels = true;

  export let lineColor = ['cornflowerblue'];

  export let xLabel = "";
  export let xKey = 'x';
  export let xDomain = undefined;
  export let xFormat = d => d;
  export let xTicks = undefined;
  
  export let yLabel = "";
  export let yKey = 'y';
  export let yDomain = undefined;
  export let yFormat = d => d;
  export let yTicks = undefined;

  export let zKey = 'z';

  export let tooltipData;
  export let tooltipFormat;
</script>

<p class="text-lg sm:text-xl text-center mb-3">{title}</p>
<div class:pl-14={yLabel} class="relative mb-14 pl-7 sm:pl-14" style="width: {width}; height: {height}">
  <p class="absolute top-1/2 -left-8 text-base sm:text-lg origin-center -rotate-90">{yLabel}</p>
  <LayerCake
    padding={{ bottom: 20, left: 40 }}
    x={xKey}
    y={yKey}
    z={zKey}
    xDomain={xDomain}
    yDomain={yDomain}
    flatData={flatData}
    data={data}
  >
    <Svg>
      <AxisX formatTick={xFormat} ticks={xTicks} />
      <AxisY formatTick={yFormat} ticks={yTicks} />
      <MultiLine colors={lineColor} />
    </Svg>

    <Html>
      {#if show_labels}<Labels />{/if}
      <SharedTooltip
        formatTitle={tooltipFormat}
        dataset={tooltipData}
      />
    </Html>
  </LayerCake>
  <p class="text-lg sm:text-xl text-center my-3">{xLabel}</p>
</div>
