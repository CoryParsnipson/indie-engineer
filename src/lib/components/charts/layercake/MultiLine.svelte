<!--
  @component
  Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
  import { getContext } from 'svelte';

  /** @type {List of Strings} [[ '#ab00d6', '#FF0000' ]] - List of colors. If there are not enough, the colors will be repeated. */
  export let colors;

  const { data, xGet, yGet } = getContext('LayerCake');

  $: path = values => {
    return 'M' + values
      .map(d => {
        return $xGet(d) + ',' + $yGet(d);
      })
      .join('L');
  };
</script>

<g class="line-group">
  {#each $data as group, idx}
    <path
      class='path-line'
      d='{path(group.values)}'
      stroke="{(colors) ? colors[idx % colors.length] : 'black' }"
    ></path>
  {/each}
</g>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }
</style>
