queue()
    .defer(d3.json, "/find/")
    //.defer(d3.json,"/findMedal/")
    .await(ready);

var logoData;
//Function call to visualizations during initial load
function ready(error, defaultAllData, defaultTableData) {
    var all = "all"
    var defaultLogoURL = "https://hative.com/wp-content/uploads/2013/11/olympic-logos/athens-olympics-1896-1.jpg";
    //console.log("Inside slider.js");
    //console.log(defaultAllData)
    setLogo(defaultLogoURL);
    readLogoData();

    var select_year = d3.select("#sel_year");
    //var options = select
    //.selectAll('option')
    select_year.text("1896")
    //tableByYear(data); <--Include visualization function calls here
    tableByYear(defaultAllData); //Priya
    //createPlot(defaultAllData); //Priya
    genderChart(defaultAllData) //Summya
    bubbleChart(defaultAllData) //Lipika
    mapChart() //Amita
}

// function selectedYear(element){
//     findYear(element);
//     findTableByYear(element);
// }

function findYear(element) {
    first_load = false;
    //console.log(element)
    // var yearinput = d3.select('#sel_year');
    // var h2 = yearinput.createElement('h2');
    // h2.textContent = "2004";
    // h2.setAttribute('class', 'note');
    // yearinput.body.appendChild(h2);

    var url = getLogoUrl(element);
    //console.log("URL for year:" + url)
    setLogo(url);



    var select_year = d3.select("#sel_year");
    //var options = select
    //.selectAll('option')
    select_year.text(element)

    var select_country = d3.select("#sel_country");
    select_country.text("")

    var all = "all"
    //Function call to visualizations after onclick event on year
    fetch('/findByYear?year=' + element)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            //console.log(data);
            genderChart(data); //Summya
            tableByYear(data); //Priya<--Include visualization function calls here
            bubbleChart(data) //Lipika
            mapChart() //Amita
        });
}

function readLogoData() {
    d3.json('static/data/logo_info.json', function (data) {
        logoData = data;
    });

}

function getLogoUrl(element) {

    var link = "";
    for (i = 0; i < logoData.length; i++) {
        if (logoData[i].Year == element)
            link = logoData[i].Logo_url

    }

    return link;

}

function setLogo(url) {
    const domElement = d3.select("#logo_div");
    domElement.html("");
    domElement.append('img').attr('src', url).attr('height', '200px').attr('width', '275px');

}

//Onclick from bubble
function clickselect(clickval) {
    first_load = true;
    var select_country = d3.select("#sel_country");
    //var options = select
    //.selectAll('option')




    fetch('/findByCountry?country=' + clickval)
        .then((response) => {
            return response.json()
        })
        .then(data => {

            const distinct = (value, index, self) => {
                return self.indexOf(value) == index;
            }

            var nCountry = data.filter(function (pickCountryFn) {
                return pickCountryFn.NOC === clickval;
            }).map(function (noc) {
                return noc.Country;
            }).filter(distinct)
            const [CountryOfClickedVal] = nCountry
            select_country.text(CountryOfClickedVal)

            //console.log(data);
            genderChart(data); //Summya
            tableByCountry(data); //Priya<--Include visualization function calls here

        });
}

function findData() {
    //console.log("Button clicked")
    fetch('/find/')
        .then((response) => {
            return response.json()
        })
        .then(data => {
            //console.log("From dataclick")
            console.log(data);
            //tabData(data);
        });
}






