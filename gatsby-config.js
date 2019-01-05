module.exports = {
  siteMetadata: {
    title: `Plotting Economic Indicators`,
    description: 'Easy plots for JavaScript using Plotly, React, and Redux',
    author: 'Kimberley Elcess',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
