<script>
  import LineChart from '$lib/components/charts/LineChart.svelte';

  import gridwise from '$lib/data/uber-gridwise.json';

  let { data, xlabels } = parseGridwiseData();

  function parseGridwiseData() {
    let vals = {};

    gridwise.data.forEach(e => {
      const d = new Date(e.date);
      const key = num2month(d.getMonth()) + ' week ' + e.week + ' ' + d.getFullYear();

      if (!(key in vals)) {
        vals[key] = {
          dollars: 0,
          hours: 0,
          month_string: num2month(d.getMonth()) + ' ' + (d.getFullYear() - 2000),
        };
      }

      let expenses = 0;
      if ('expense' in e) {
        Object.values(e.expense).forEach(c => expenses += c);
      }

      vals[key].dollars += e.revenue;
      vals[key].hours += e.hours;
    });

    // { x: dollars per hour, y: week number? }
    let data = [];
    let xlabels = [];
    let idx = 0;
    for (const [key, d] of Object.entries(vals)) {
      data.push({
        x: idx,
        y: Math.round(d.dollars / d.hours),
      });

      xlabels.push(d.month_string);

      idx++;
    }

    return {
      data: data,
      xlabels: xlabels,
    };
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
</script>

<LineChart
  data={data}
  title={"Dollars Per Hour"}
  xFormat={formatX}
  xTicks={data.length}
  yLabel={'$USD / hr'}
  yDomain={[0, 40]}
/>
