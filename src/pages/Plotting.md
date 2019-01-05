---
title: 'Plotting Gross National Income'
date: '2019-01-25'
author: 'Kimberley Elcess'
---

## Easy plots for JavaScript using Plotly, React, and Redux

A picture may be worth a thousand words, but it's certainly worth thousands of data points. Plotting your data makes it easier to see outliers and mistakes, easier to explain, and easier to understand. Best of all, you can do it on your website using JavaScript, opening up possibilities for interactivity.

### Why Plotly?

Plotly is a JavaScript package that makes interactive plots right out of the box. The only other package it requires is `react-plotly`, so you don't need to install a lot of packages to make it work with your web app. There are lots of types of plots available, from the simple to the statistical, and they can all show the underlying data when you hover over individual points. There are other options out there, such as the Plot function from stdlib.js. I found Plotly easier to work with, though, so that's the package I've chosen for this post.

### Installation

Installation is by far the biggest challenge. You'll need to install the normal packages you use for your web app (a server, middleware, and a bundler with a transpiler). Make sure your home page renders correctly before trying to show a plot. My example app uses React with Redux, and I build it using `webpack` and `babel`.
Now install `plotly.js` and `react-plotly.js`. Use the starter code example at https://github.com/plotly/react-plotly.js/blob/master/README.md#quick-start and refresh your page. You should see the plot magically appear. If you just have a few bits of data to show, plug them in to the example code and you're off! If not, read on.

### Getting the data

Data is available everywhere, but for this demo I turned to the World Bank's World Development Indicators https://databank.worldbank.org/data/source/world-development-indicators. Their developers' guide (https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information) tells you how to retrieve data as XML, JSON, or jsonstat. I chose to copy the jsonstat-formatted data from the results page into separate JSON files, although you can download it as well. Simply `import` the resulting JSON file(s) to use the data.
While the documentation indicates you can get multiple indicators with a single query, I found that to be true only when asking for a single country or region. Because I wanted data for multiple regions, I requested a single indicator for each query and saved the jsonstat to separate files that I later required or imported into my JavaScript. The jsonstat format returns a single object with the first key of "WDI" when the source is World Development Indicators.
If you use your own data, just be aware that Plotly expects all `x` values to be in a single array of individual numbers or strings and all `y` values to be in a separate single array.

### WDI jsonstat data format

The WDI object has five keys: label, source, updated, value, and dimension. The source is a string you can use to annotate the plot with the source of your data, in my case "World Development Indicators." The last update date is indicated in the updated field as a string-formatted date in YYYY-MM-DD format. The values for your data are in one long array in the value field. Values are listed in date-ascending order for one country / region at a time. I asked for 20 years' worth of data for each of 7 countries / regions for a total of 140 records. The total number of records is also part of the label field.
The dimension field is the most complex and is where you'll find the keys to ordering the data. If you've only asked for data from a single country, all the values pertain to that country and you'll just need to pick up the date range from `WDI.dimension.year.category.label`. This object has values corresponding to the four-digit year as strings. Plotly understands string-formatted dates as dates, so no conversion is necessary to display the data as time series. `WDI.dimension.year.label` contains a string label for the time series, here "Year," that can be used as the time axis label.
If you've chosen to get data from more than one country / region in the same query, you can use the length of the time series to separate the single value array into slices corresponding to individual data sets. Simply loop over the number of countries / regions, available from `WDI.dimension.size[0]`, and take slices of length equal to the number of time points (either from the length of the time series or `WDI.dimension.size[2]`). Each data set can be labeled with the country / region by accessing `WDI.dimension.country.category.label`. This object's values are strings corresponding to the countries / regions in the order in which the values were returned.

### Turning data into traces

Although the data returned is a deeply nested object, the jsonstat format keeps objects together in such a way that they are easily transformed into arrays. That is the format Plotly uses for its coordinates. You can also reach text for titles and legends programmatically for better reproducibility.
The World Bank lumps countries into income levels, so I chose to get GNI per capita for each of the five income levels, the USA, and the World. As mentioned above, the values (`y` coordinates for a time series plot) are in one big array. Data for each of the countries / regions makes up a single trace for my plot, and I have seven traces on the plot. All the `x` values are the same, so I define a constant, `years`, to use for each `trace.x`. For `trace.y` I slice the value array into lengths equal to the number of years of data, in this case 20. Each trace has its own marker color and name for use in the legend. I define a constant array of colors and use the values of the `WDI.dimension.country.category.label` object (another array) for the legend name. Other trace properties are the same for each trace, so I define them as constants and then assign them to `trace.mode` and `trace.type` and push each trace object onto a `traces` array. I then give the Plot component the `traces` array as its `data` property.

### Plotting and publishing

The Plot component takes a second property, `layout`, that I use here. The layout is an object with many optional properties. For this plot I've defined the width, height, title, xaxis title, and yaxis title. The Plot component is rendered like any other React component and will update if the data is changed. To access it, `import Plot from 'react-plotly'` in any file that renders it.

### Summary

To recap, follow these steps to add a Plotly graphic to your web app.

1. Set up your basic web app as usual. When it renders your desired home page, continue.
2. Install plotly.js and react-plotly.js.
3. Get some data.
4. Generate a trace object for each series in your dataset.
5. Make an array of the trace objects.
6. Pass the array of trace objects to a Plot component as the data property.
7. If desired, add layout definitions as an object to pass to the layout property of the Plot component.
8. Build and serve.

### Conclusion

Fire up your app and admire your handiwork. Hover over the traces to see the underlying data. Try the zoom features. Enjoy!
