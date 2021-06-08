
var olympicData;

dataUrl = "static/data/data.json"
var tbody = d3.select("tbody");
// function tabData(data){
//   console.log("Inside Tabular data")
//   console.log(data)
// //}

const distinct = (value, index, self) => {
  return self.indexOf(value) == index;
}

d3.json('/find/', function (data) {



  //console.log(data);
  olympicData = data;
  countryData = populateParticipatingCountries(data);
  sportData = populateParticipatingSport(data);
  var seasons = ['Summer', 'Winter'];
  var medal = ['Select', 'None', 'Gold', 'Silver', 'Bronze'];
  var gender = ['Select', 'Male', 'Female'];
  setYear(data);
  generateCountryList(countryData);
  generateSeasonList(seasons);
  generateSportList(sportData);
  generateMedalList(medal);
  generateGenderList(gender);
  addListeners();
  displayData(data);
});
//}
function setYear(data) {
  var yearSel = data.map(yearFn => yearFn.Year).filter(distinct)
  const [year] = yearSel

  var select_year = d3.select("#sel_year");
  //var options = select
  //.selectAll('option')
  select_year.text(`Olympics Year: ${year}`)
}

function addListeners() {
  d3.select("#selectCountry").on("change", onTeamchange, false);
  d3.select("#selectSeason").on("change", onSeasonchange, false);
  d3.select("#selectSport").on("change", onSportchange, false);
  d3.select("#selectMedal").on("change", onMedalchange, false);
  d3.select("#selectGender").on("change", onGenderchange, false);
  d3.select("#filter-btn").on("click", onFilterButtonchange, false);
}

//Function to Display the Olympic Data
function displayData(olympicData) {
  for (i = 0; i < olympicData.length; i++) {

    //console.log(olympicData[i]);

    var row = tbody.append("tr");
    Object.entries(olympicData[i]).forEach(([key, value]) => {
      if (key == 'ID');
      else {
        var cell = row.append("td");
        cell.text(value);
      }

    });

  }

}

//Initialize all Lists
function populateParticipatingCountries(olympicCountriesData) {
  var countryList = ["Select"];
  var countryData = olympicCountriesData.map(countryListFn => countryListFn.Team);
  countryData.forEach((countryName) => {
    if (!(countryList.includes(countryName))) {
      countryList.push(countryName);
    }
  })
  //console.log(countryList)
  return countryList;
}

function populateParticipatingSport(olympicCountriesData) {
  var sportList = ["Select"];
  var sportData = olympicCountriesData.map(countryListFn => countryListFn.Sport);
  //console.log(sportData);
  sportData.forEach((sport) => {
    if (!(sportList.includes(sport))) {
      sportList.push(sport);
    }
  })
  //console.log(sportList);
  return sportList;
}

function generateCountryList(data) {

  var select = d3.select("#selectCountry");

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
    .text(function (d) { return d; });

}


//Bind the data to all Lists
function generateSeasonList(data) {
  //console.log(data);
  var select = d3.select("#selectSeason");

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
    .on('change', onSeasonchange)
    .text(function (d) { return d; });




}

function generateSportList(data) {
  //console.log(data);
  var select = d3.select("#selectSport");

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
    .on('change', onSportchange)
    .text(function (d) { return d; });

}

function generateMedalList(data) {
  //console.log(data);
  var select = d3.select("#selectMedal");

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
    .on('change', onMedalchange)
    .text(function (d) { return d; });

}

function generateGenderList(data) {
  //console.log(data);
  var select = d3.select("#selectGender");

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
    .on('change', onGenderchange)
    .text(function (d) { return d; });

}


//Handle events of the dropdown control

function onSeasonchange() {
  //console.log('Season change called');
  selectValue = d3.select('#selectSeason').property("value").trim();
  //console.log("selected value" + selectValue);
  tbody.html("");
  var filteredBySeason = filterDataBySeason(selectValue);
  //console.log(filteredBySeason);
  displayData(filteredBySeason);
};

//Apply Season filter condition
function filterDataBySeason(season) {
  return olympicData.filter(dt => dt.Season == season)
}

//Handle Team change event
function onTeamchange() {
  //console.log('Country change dd called');
  selectValue = d3.select('#selectCountry').property("value").trim();
  //console.log("selected value" + selectValue);
  tbody.html("");
  var filteredByTeam = filterDataByTeam(selectValue);
  //console.log(filteredByTeam);
  displayData(filteredByTeam);

};

//Apply Team filter condition
function filterDataByTeam(team) {
  return olympicData.filter(dt => dt.Team == team)
}


//Handle Sport change event
function onSportchange() {
  //console.log('Season change called');
  selectValue = d3.select('#selectSport').property("value").trim();
  //console.log("selected value" + selectValue);
  tbody.html("");
  var filteredBySport = filterDataBySport(selectValue);
  //console.log(filteredBySport);
  displayData(filteredBySport);
};

//Apply Sport filter condition
function filterDataBySport(sport) {
  return olympicData.filter(dt => dt.Sport == sport)
}

//Apply medal filter
function onMedalchange() {
  //console.log('Season change called');
  selectValue = d3.select('#selectMedal').property("value").trim();
  //console.log("selected value" + selectValue);
  tbody.html("");
  var filteredByMedal = filterDataByMedal(selectValue);
  //console.log(filteredByMedal);
  displayData(filteredByMedal);
};

//Apply Medal filter condition
function filterDataByMedal(medal) {
  return olympicData.filter(dt => dt.Medal == medal)
}


function onGenderchange() {
  //console.log('Season change called');
  selectValue = d3.select('#selectGender').property("value").trim();
  //console.log("selected value" + selectValue);
  tbody.html("");
  var filteredByGender = filterDataByGender(selectValue.charAt(0));
  //console.log(filteredByGender);
  displayData(filteredByGender);
};


//Apply Gender filter condition
function filterDataByGender(gender) {
  return olympicData.filter(dt => dt.Sex == gender)
}

//Handle all the drop down filters
function onFilterButtonchange() {
  //console.log('Button clicked');
  var countryinput = d3.select('#selectCountry');
  var seasoninput = d3.select('#selectSeason');
  var sportinput = d3.select('#selectSport');
  var medalinput = d3.select('#selectMedal');
  var genderinput = d3.select("#selectGender");
  d3.event.preventDefault();


  var filterCountry = countryinput.property("value").trim();
  var filterSeason = seasoninput.property("value").trim();
  var filterSport = sportinput.property("value").trim();
  var filterMedal = medalinput.property("value").trim();
  var filterGender = genderinput.property("value").trim();

  tbody.html("");

  filteredByAllData = (filterDataByAll(filterSeason, filterCountry, filterSport, filterMedal, filterGender.charAt(0)));

  displayData(filteredByAllData);

};
function filterDataByAll(season, team, sport, medal, gender) {
  return olympicData.filter(dt => dt.Season == season && dt.Team == team && dt.Sport == sport && dt.Medal == medal && dt.Sex == gender)
}





