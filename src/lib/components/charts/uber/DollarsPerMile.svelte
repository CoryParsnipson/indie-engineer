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
      '$/mi': (entry.dollars / entry.miles).toFixed(2),
      '$/mi minus gas': ((entry.dollars - entry.expense) / entry.miles).toFixed(2),
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
  title={"Dollars Per Mile"}
  lineColor={['purple', 'green']}
  xFormat={formatX}
  xTicks={data.length}
  yLabel={'$USD / mile'}
  yDomain={[0, 2]}
  tooltipData={data}
  tooltipFormat={tooltipFormat}
/>
