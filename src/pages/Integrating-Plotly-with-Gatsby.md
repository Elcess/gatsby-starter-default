---
title: 'Integrating Plotly with Gatsby'
date: '2019-01-26'
author: 'Kimberley Elcess'
---

## Background

Plotly.js is a package for plotting data that uses React. It is easy to use and comes with some nice features out of the box. However, it expects a global `document` to be defined.

Gatsby is a static site generator that is designed to work with React. It is easy to use and comes with some starter repositories to help you get up and running quickly. However, it takes control of some of the objects other packages may expect to see. For example, the global `document` is not directly accessible to packages.

The upshot is that after I added a Plotly component to my working Gatsby website, the builds failed.

## Finding the Problem

Looking through the build log I found that the build failed while Gatsby was trying to create static HTML files from my pages. Gatsby gave a useful prompt in the error message, sending me to https://www.gatsbyjs.org/docs/debugging-html-builds/. I identified the problem as their number one issue: "Some of your code references 'browser globals' like `window` or `document`."

## Fixing the Problem

I first tried to check for the existence of `document` in the Plotly code. Those checks did not resolve my particular problem. Next I moved on to their "worst case" fix: customizing the webpack configuration.

In the `gatsby-node.js` file I added a short segment to bypass the static build for the Plotly modules, following the example given by the documentation.

```javascript
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /plotly.js/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
```

Subsequent builds passed and I was able to deploy the Plotly components with no errors.

## Conclusion

Gatsby and Plotly can be used together, they just need a little help to get along.

See examples [here](../GNI), [here](../Fertility), and [here](../Fertility-GNI).
