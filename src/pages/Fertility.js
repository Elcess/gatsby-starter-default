import React from 'react';
import Plot from 'react-plotly.js';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import fertility from '../data/fertility.json';
import { makeTimeSeries } from '../utils/makeTraces';

class Fertility extends React.Component {
  constructor() {
    super();
    this.state = { fertility: fertility };
  }
  render() {
    if (this.state.fertility && typeof document !== 'undefined') {
      const years = Object.values(
        this.state.fertility.WDI.dimension.year.category.label
      );
      const fertilityValues = Object.values(this.state.fertility.WDI.value);
      const countries = Object.values(
        this.state.fertility.WDI.dimension.country.category.label
      );
      const tracesFertility = makeTimeSeries(years, fertilityValues, countries);
      return (
        <Layout>
          <SEO title="Fertility by Income Level" />
          <Plot
            data={tracesFertility}
            layout={{
              width: 600,
              height: 600,
              title: 'Fertility by Income Level',
              xaxis: { title: 'Year', zeroline: false },
              yaxis: { title: 'Children per Woman' },
            }}
          />
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <SEO title="Fertility by Income Level" />
          <h2>Loading data ...</h2>
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    }
  }
}

export default Fertility;
