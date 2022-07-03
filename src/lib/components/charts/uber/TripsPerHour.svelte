<script>
  import MultiLineChart from '$lib/components/charts/MultiLineChart.svelte';

  import gridwise from '$lib/data/uber-gridwise.json';

  let { data, data_long, xlabels, tooltiplabels } = parseGridwiseData();

  function parseGridwiseData() {
    let vals = {};

    gridwise.data.forEach(e => {
      const d = new Date(e.date);
      const key = num2month(d.getMonth()) + ' week ' + e.week + ' ' + d.getFullYear();

      if (!(key in vals)) {
        vals[key] = {
          trips: 0,
          hours: 0,
          month_string: num2month(d.getMonth()) + " '" + (d.getFullYear() - 2000),
          week_string: num2month(d.getMonth()) + ' Week ' + e.week + " '" + (d.getFullYear() - 2000),
        };
      }

      vals[key].trips += e.trips;
      vals[key].hours += e.hours;
    });

    // { x: dollars per hour, revenue: one series, minus_gas: second series }
    let data = [];
    let xlabels = [];
    let tooltiplabels = [];
    let idx = 0;
    for (const [key, d] of Object.entries(vals)) {
      data.push({
        x: idx,
        'trips/hr': (d.trips / d.hours).toFixed(2),
      });

      xlabels.push(d.month_string);
      tooltiplabels.push(d.week_string);

      idx++;
    }

    // split data into list of x, y with one series per item
    let seriesNames = ['trips/hr'];
    let data_long = [];
    data_long = seriesNames.map(key => {
      return {
        z: key,
        values: data.map(d => {
          return {
            x: d.x,
            y: d[key],
          }
        }),
      };
    });

    return {
      data: data,
      data_long: data_long,
      xlabels: xlabels,
      tooltiplabels: tooltiplabels,
    };
  }

  function flatten(data_long) {
    return data_long.reduce((memo, group) => { return memo.concat(group.values); }, []);
  }

  function getMonthFromDate(d) {
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    for (let i = 0; i < months.length; ++i) {
      if (d.date.includes(months[i])) {
        return months[i];
      }
    }

    return "";
  }

  function num2month(n) {
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    return months[n % months.length];
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
