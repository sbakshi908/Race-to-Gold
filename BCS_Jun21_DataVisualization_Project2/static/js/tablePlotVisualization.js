//Creates the table and line plot based on the Medal stats from tableVisualization.js

function createPlot(rows, viewData, option) {


  //var year = 2000;

  if (option === 'year') {

    function unpack(rows, key) {
      return rows.map(function (row) { return row[key]; });
    }

    // header values
    var headerNames = d3.keys(rows[0]);
    //console.log("header" + headerNames);
    var headerValues = [headerNames[0], headerNames[1], headerNames[2],
    headerNames[3], headerNames[4], headerNames[5]];

    // cell values
    var cellValues = [];
    for (i = 0; i < headerValues.length; i++) {
      cellValue = unpack(rows, headerValues[i]);
      cellValues[i] = cellValue;
    }
    //console.log("header" + headerValues)
    // clean date
    //   for (i = 0; i < cellValues[0].length; i++) {
    //   //var dateValue = cellValues[0][i].split(' ')[0]
    //   cellValues[0][i] = dateValue
    //   }

    var table = {
      type: 'table',
      columnwidth: [200, 150, 150, 150, 200, 200],
      columnorder: [0, 1, 2, 3, 4, 5],
      header: {
        values: headerValues,
        align: "center",
        line: { width: 1, color: 'rgb(50, 50, 50)' },
        fill: { color: ['#a9c9cc'] },
        font: { family: "Arial", size: 11, color: "black" }
      },
      cells: {
        values: cellValues,
        align: ["center", "center"],
        line: { color: "black", width: 1 },
        fill: { color: ['#a9c9cc', '#c0cdcf'] },
        font: { family: "Arial", size: 10, color: ["black"] }
      },
      xaxis: 'x',
      yaxis: 'y',
      domain: { x: [0, 0.4], y: [0, 1] }
    }
    // create 1st plot
    var trace1 = {
      x: unpack(rows, 'Code'),
      y: unpack(rows, 'Gold'),
      xaxis: 'x1',
      yaxis: 'y1',
      mode: 'lines',
      line: { width: 2, color: '#f55e07' },
      name: 'Gold'
    }
    // create 2nd plot
    var trace2 = {
      x: unpack(rows, 'Code'),
      y: unpack(rows, 'Silver'),
      xaxis: 'x2',
      yaxis: 'y2',
      mode: 'lines',
      line: { width: 2, color: '#403d3b' },
      name: 'Silver'
    }

    // create 3rd plot
    var trace3 = {
      x: unpack(rows, 'Code'),
      y: unpack(rows, 'Bronze'),
      xaxis: 'x3',
      yaxis: 'y3',
      mode: 'lines',
      line: { width: 2, color: '#e8132c' },
      name: 'Bronze'
    }
  }
  else {

    function unpack(rows, key) {
      return rows.map(function (row) { return row[key]; });
    }

    // header values
    var headerNames = d3.keys(rows[0]);
    //console.log("header" + headerNames);
    var headerValues = [headerNames[0], headerNames[1], headerNames[2],
    headerNames[3], headerNames[4]];

    // cell values
    var cellValues = [];
    for (i = 0; i < headerValues.length; i++) {
      cellValue = unpack(rows, headerValues[i]);
      cellValues[i] = cellValue;
    }
    //console.log("header" + headerValues)
    // clean date
    //   for (i = 0; i < cellValues[0].length; i++) {
    //   //var dateValue = cellValues[0][i].split(' ')[0]
    //   cellValues[0][i] = dateValue
    //   }

    var table = {
      type: 'table',
      columnwidth: [200, 150, 150, 150, 200],
      columnorder: [0, 1, 2, 3, 4],
      header: {
        values: headerValues,
        align: "center",
        line: { width: 1, color: 'rgb(50, 50, 50)' },
        fill: { color: ['#a9c9cc'] },
        font: { family: "Arial", size: 11, color: "black" }
      },
      cells: {
        values: cellValues,
        align: ["center", "center"],
        line: { color: "black", width: 1 },
        fill: { color: ['#a9c9cc', '#c0cdcf'] },
        font: { family: "Arial", size: 10, color: ["black"] }
      },
      xaxis: 'x',
      yaxis: 'y',
      domain: { x: [0, 0.4], y: [0, 1] }
    }
    // create 1st plot
    var trace1 = {
      x: unpack(rows, 'Sports'),
      y: unpack(rows, 'Gold'),
      xaxis: 'x1',
      yaxis: 'y1',
      mode: 'lines',
      line: { width: 2, color: '#f55e07' },
      name: 'Gold'
    }
    // create 2nd plot
    var trace2 = {
      x: unpack(rows, 'Sports'),
      y: unpack(rows, 'Silver'),
      xaxis: 'x2',
      yaxis: 'y2',
      mode: 'lines',
      line: { width: 2, color: '#403d3b' },
      name: 'Silver'
    }

    // create 3rd plot
    var trace3 = {
      x: unpack(rows, 'Sports'),
      y: unpack(rows, 'Bronze'),
      xaxis: 'x3',
      yaxis: 'y3',
      mode: 'lines',
      line: { width: 2, color: '#e8132c' },
      name: 'Bronze'
    }
  }
  var data = [table, trace1, trace2, trace3]

  // define subplot axes
  var axis = {
    showline: true,
    zeroline: false,
    showgrid: true,
    mirror: true,
    ticklen: 4,
    gridcolor: '#ffffff',
    tickfont: { size: 12 },
  }

  var axis1 = { domain: [0.5, 1], anchor: 'y1', showticklabels: false }
  var axis2 = { domain: [0.5, 1], anchor: 'y2', showticklabels: false }
  var axis3 = { domain: [0.5, 1], anchor: 'y3' }

  var axis4 = { domain: [0.66, 0.98], anchor: 'x1' }//, hoverformat: '.2f'}
  var axis5 = { domain: [0.34, 0.64], anchor: 'x2' }//, tickprefix: '$', hoverformat: '.2f'}
  var axis6 = { domain: [0.0, 0.32], anchor: 'x3' }//, tickprefix: '\u20BF', hoverformat: '.2f'}
  //var axis8 = {domain: [0.0, 0.32], anchor: 'x4', tickprefix: '\u20BF', hoverformat: '.2f'}

  // define layout
  var layout = {
    title: {
      'text': `Medal Statistics for ${viewData}`,
      'y': 0.9,
      'x': 0.5,
      'size': 25,

      'xanchor': 'center',
      'yanchor': 'top'
    },
    plot_bgcolor: '#a9c9cc',
    //plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,
    legend: {
      x: 0.43,
      y: 0.5,
      traceorder: 'normal',
      font: {
        family: 'sans-serif',
        size: 12,
        color: '#000'
      },
      bgcolor: '#E2E2E2',
      bordercolor: '#FFFFFF',
      borderwidth: 2
    },

    xaxis1: Object.assign(axis1, axis),
    xaxis2: Object.assign(axis2, axis),
    xaxis3: Object.assign(axis3, axis),

    yaxis1: Object.assign(axis4, axis),
    yaxis2: Object.assign(axis5, axis),
    yaxis3: Object.assign(axis6, axis)

  }

  Plotly.newPlot('line', data, layout);

  //});
}