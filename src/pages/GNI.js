import React from 'react';
import Plot from 'react-plotly.js';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import gni from '../data/gni.json';
import { makeTimeSeries } from '../utils/makeTraces';

class GNI extends React.Component {
  constructor() {
    super();
    this.state = {
      gni: gni,
    };
  }
  render() {
    if (this.state.gni && typeof document !== 'undefined') {
      const years = Object.values(
        this.state.gni.WDI.dimension.year.category.label
      );
      const gniValues = Object.values(this.state.gni.WDI.value);
      const countries = Object.values(
        this.state.gni.WDI.dimension.country.category.label
      );
      const tracesGNI = makeTimeSeries(years, gniValues, countries);
      return (
        <Layout>
          <SEO title="Gross National Income" />
          <Plot
            data={tracesGNI}
            layout={{
              width: 600,
              height: 600,
              title: 'Gross National Income by Income Level',
              yaxis: { title: 'GNI per Capita (Atlas method) 2018 USD' },
              xaxis: { title: 'Year', zeroline: false },
            }}
          />
          <h6>Source: World Bank, World Development Indicators</h6>
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <SEO title="Gross National Income" />
          <h2>Loading data ...</h2>
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    }
  }
}

export default GNI;
