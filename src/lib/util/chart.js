export function flatten(data) {
  return data.reduce((memo, group) => { return memo.concat(group.values); }, []);
}

export function getMonthFromDate(d) {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

  for (let i = 0; i < months.length; ++i) {
    if (d.date.includes(months[i])) {
      return months[i];
    }
  }

  return "";
}

export function num2month(n) {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  return months[n % months.length];
}

export function parseGridwiseData(
  gridwise, /* gridwise json data */
  seriesFunc = (key, entry) => { return { 'default': 1 } }, /* function to generate lines based on data entries */
  keyFunc = (entry) => { return '' + entry.date; }, /* function to bucket entries by generating key string */
) {
  let vals = {};

  gridwise.data.forEach(e => {
    const d = new Date(e.date);
    const key = keyFunc(e);

    if (!(key in vals)) {
      vals[key] = {
        dollars: 0,
        miles: 0,
        trips: 0,
        hours: 0,
        expense: 0,
        month_string: num2month(d.getMonth()) + " '" + (d.getFullYear() - 2000),
        week_string: num2month(d.getMonth()) + ' Week ' + e.week + " '" + (d.getFullYear() - 2000),
      };
    }

    let expenses = 0;
    if ('expense' in e) {
      Object.values(e.expense).forEach(c => expenses += c);
    }

    vals[key].dollars += e.revenue;
    vals[key].miles += e.miles;
    vals[key].trips += e.trips;
    vals[key].hours += e.hours;
    vals[key].expense += expenses;
  });

  // { x: dollars per hour, revenue: one series, minus_gas: second series }
  let data = [];
  let xlabels = [];
  let tooltiplabels = [];
  let idx = 0;
  for (const [key, d] of Object.entries(vals)) {
    data.push({ x: idx, ...seriesFunc(key, d)});

    xlabels.push(d.month_string);
    tooltiplabels.push(d.week_string);

    idx++;
  }

  // split data into list of x, y with one series per item
  let seriesNames = Object.keys(data[0]).filter(k => k != 'x');
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
