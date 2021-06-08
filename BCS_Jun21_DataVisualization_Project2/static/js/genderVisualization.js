
first_load = false;

//create chart inside test 1 
function genderChart(data) {
  //console.log("Inside genderChart.js")
  //console.log(data);


  // create an object that accumulates the event types by gender
  var accumulator = {};

  const distinct_year = (value, index, self) => {
    return self.indexOf(value) == index;
  }
  var year = data.map(d => d.Year).filter(distinct_year)
  const [selYear] = year

  const distinct_country = (value, index, self) => {
    return self.indexOf(value) == index;
  }
  var country = data.map(d => d.Country).filter(distinct_country)
  const [selCountry] = country

  //var country = data.map(d=> d.Team)

  //default cumulative data
  for (var i = 0; i < data.length; i++) {
    const current = data[i];
    const gender = current.Sex;
    const event = current.Sport;
    //console.log("Gender:"+gender+":"+event)
    //const curr_year = current.Year;
    //const country = current.Team;

    // //New addition
    // var countryList = []
    // var countryData = data.map(countryListFn => countryListFn.NOC);
    // countryData.forEach((countryName) => {
    //   if (!(countryList.includes(countryName))) {
    //     countryList.push(countryName);
    //   }
    // });

    // const selectedNOC = countryList.filter(v => v == "USA");
    // //filter to see if we can just pull out 1 country
    // if (!accumulator.hasOwnProperty(gender) && !accumulator.hasOwnProperty(selectedNOC) )
    //   accumulator[gender] = {};
    //*************** */

    if (!accumulator.hasOwnProperty(gender))
      accumulator[gender] = {};
    const thing = accumulator[gender];
    //console.log("Inside Accumulator" + thing)
    if (thing.hasOwnProperty(event)) {
      thing[event]++;
    }
    else
      thing[event] = 1;

    //loop here that filters the data to just the year user chooses on the slider
    //while (sliderValue == curr_year) {
    //accumulator[curr_year] = {};
    //}

  }



  //selected value with event listener 


  //console.log(`${accumulator}`);
  var males = accumulator.M;
  var females = accumulator.F;
  var year = accumulator.curr_year;
  //console.log(`Only males: ${males}`);
  //console.log(`${females}`);
  //console.log(`years ${year.length}`)
  //console.log(year);

  if (typeof (females) == 'undefined') {
    var trace1 = {
      x: Object.keys(males),
      y: Object.values(males),
      name: 'Male',
      type: 'bar'
    };

    var data = [trace1]
  }
  else {
    //begin chart
    //xis events 
    //trace 1 is used for male 
    var trace1 = {
      x: Object.keys(males),
      y: Object.values(males),
      name: 'Male',
      type: 'bar'
    };

    var trace2 = {
      x: Object.keys(females),
      y: Object.values(females),
      name: 'Female',
      type: 'bar'
    };

    var data = [trace1, trace2];
  }

  if (first_load == false) {
    new_title = `Male vs Female Atheltes in ${selYear} for All Participating Countries`
  }
  else {
    new_title = `Male vs Female Atheltes in ${selYear} in ${selCountry}`
  }
  var layout = {
    title: new_title,
    //title: `Male vs Female Atheltes in ${selYear} in ${selCountry}`, 
    xaxis: { title: "Sporting Events" },
    yaxis: { title: "Number of Athletes" },
    barmode: "stack",
    plot_bgcolor: '#a9c9cc',
    showticklabels: true,
    paper_bgcolor: 'rgba(0,0,0,0)'
  };



  Plotly.newPlot('new_bar', data, layout);

  first_load = false;

};