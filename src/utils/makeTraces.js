export const makeTimeSeries = (xValues, yValues, countries) => {
  let traces = [];

  const colors = [
    'red',
    'orange',
    'green',
    'blue',
    'indigo',
    'purple',
    'black',
  ];
  const type = 'scatter';
  const mode = 'lines+points';

  for (let i = 0; i < countries.length; i++) {
    let trace = {};
    trace.type = type;
    trace.mode = mode;
    trace.marker = { color: colors[i] };
    trace.x = xValues;
    trace.y = yValues.slice(i * xValues.length, (i + 1) * xValues.length);
    trace.name = countries[i];
    traces.push(trace);
  }

  return traces;
};

export const makeScatter = (xValues, yValues, countries) => {
  let traces = [];

  const colors = [
    'red',
    'orange',
    'green',
    'blue',
    'indigo',
    'purple',
    'black',
  ];
  const type = 'scatter';
  const mode = 'lines+points';

  const seriesLength = xValues.length / countries.length;

  for (let i = 0; i < countries.length; i++) {
    let trace = {};
    trace.type = type;
    trace.mode = mode;
    trace.marker = { color: colors[i] };
    trace.x = xValues.slice(i * seriesLength, (i + 1) * seriesLength);
    trace.y = yValues.slice(i * seriesLength, (i + 1) * seriesLength);
    trace.name = countries[i];
    traces.push(trace);
  }

  return traces;
};

// const years = Object.values(this.props.gni.WDI.dimension.year.category.label);
// const gniValues = Object.values(this.props.gni.WDI.value);
// const countries = Object.values(
//   this.props.gni.WDI.dimension.country.category.label
// );
