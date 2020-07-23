export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData
};


export const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for(let date in data[casesType]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint, // difference between two dates e.g  cases: 3/25/20: 476376 3/26/20: 539336 3/27/20: 603736
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  };
  return chartData;
};