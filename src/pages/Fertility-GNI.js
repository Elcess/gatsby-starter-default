import React from 'react';
import Plot from 'react-plotly.js';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import fertility from '../data/fertility.json';
import gni from '../data/gni.json';
import { makeScatter } from '../utils/makeTraces';

class FertilityGNI extends React.Component {
  constructor() {
    super();
    this.state = { fertility: fertility, gni: gni };
  }
  render() {
    if (
      this.state.gni &&
      this.state.fertility &&
      typeof document !== 'undefined'
    ) {
      const fertilityValues = Object.values(this.state.fertility.WDI.value);
      const gniValues = Object.values(this.state.gni.WDI.value);
      const countries = Object.values(
        this.state.fertility.WDI.dimension.country.category.label
      );
      const traces = makeScatter(gniValues, fertilityValues, countries);
      return (
        <Layout>
          <SEO title="Fertility vs GNI per Capita" />
          <Plot
            data={traces}
            layout={{
              width: 600,
              height: 600,
              title: 'Fertility vs GNI per Capita by Income Level',
              xaxis: { title: 'GNI per Capita (Atlas method) 2018 USD' },
              yaxis: { title: 'Children per Woman' },
            }}
          />
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <SEO title="Fertility vs GNI per Capita" />
          <h2>Loading data ...</h2>
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    }
  }
}

export default FertilityGNI;
