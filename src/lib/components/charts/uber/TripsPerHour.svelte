<script>
  import MultiLineChart from '$lib/components/charts/MultiLineChart.svelte';

  import gridwise from '$lib/data/uber-gridwise.json';
  import { flatten, getMonthFromDate, num2month, parseGridwiseData } from '$lib/util/chart';

  let { data, data_long, xlabels, tooltiplabels } = parseGridwiseData(gridwise, seriesFunc, keyFunc);

  function keyFunc(entry) {
    const d = new Date(entry.date);
    return num2month(d.getMonth()) + ' week ' + entry.week + ' ' + d.getFullYear();
  }

  function seriesFunc(key, entry) {
    return {
      'trips/hr': (entry.trips / entry.hours).toFixed(2),
    };
  }

  function formatX(d) {
    if (d == 0 || d > 0 && xlabels[d].slice(0, 3) !== xlabels[d - 1].slice(0, 3)) {
      return xlabels[d];
    }
    return "";
  }

  function tooltipFormat(d) {
    return tooltiplabels[d];
  }
</script>

<MultiLineChart
  data={data_long}
  flatData={flatten(data_long)}
  title={"Trips Per Hour"}
  show_labels={false}
  lineColor={['salmon']}
  xFormat={formatX}
  xTicks={data.length}
  yLabel={'trips / hr'}
  yDomain={[0, 3]}
  tooltipData={data}
  tooltipFormat={tooltipFormat}
/>
