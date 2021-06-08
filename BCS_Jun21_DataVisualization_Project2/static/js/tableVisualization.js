const distinct = (value, index, self) => {
    return self.indexOf(value) == index;
}

function tableByYear(dataset) {
    var option = "year"
    //console.log("Medal data Inside visual.js");

    var yearSel = dataset.map(yearFn => yearFn.Year).filter(distinct)
    const [year] = yearSel

    //console.log(dataset);
    var tableData = dataset;

    var countryList = []
    var countryData = dataset.map(countryListFn => countryListFn.Country);

    countryData.forEach((countryName) => {
        if (!(countryList.includes(countryName))) {
            countryList.push(countryName);

        }
    })

    var medalObj = [];
    countryList.forEach((countryName) => {
        var countryItem = {};

        //var noc_code = dataset.filter(medalFn => (medalFn.Country === countryName))
        var nCode = dataset.filter(function (medalFn) {
            return medalFn.Country === countryName;
        }).map(function (noc) {
            return noc.NOC;
        }).filter(distinct)
        const [noc_code] = nCode // destructuring the array

        //console.log("NOC_CODE" + noc_code)
        var goldMedal = dataset.filter(medalFn => (medalFn.Country === countryName) && (medalFn.Medal === "Gold"));
        var silverMedal = dataset.filter(medalFn => (medalFn.Country === countryName) && (medalFn.Medal === "Silver"));
        var bronzeMedal = dataset.filter(medalFn => (medalFn.Country === countryName) && (medalFn.Medal === "Bronze"));
        //console.log(countryName+":"+goldMedal.length+":"+silverMedal.length+":"+bronzeMedal.length)

        countryItem["Code"] = noc_code;
        countryItem["Country"] = countryName;
        countryItem["Gold"] = goldMedal.length;
        countryItem["Silver"] = silverMedal.length;
        countryItem["Bronze"] = bronzeMedal.length;
        countryItem["TotalMedal"] = goldMedal.length + silverMedal.length + bronzeMedal.length;
        medalObj.push(countryItem);
    })

    createPlot(medalObj, year, option);

    // var tableBody = d3.select("tbody");
    // tableBody.html("");

    // medalObj.forEach( (medalStat) =>{
    //     var medalRow = tableBody.append("tr");

    //     Object.entries(medalStat).forEach(([key,value]) => {

    //         var medalCell = medalRow.append("td");
    //         medalCell.text(value);
    //     });
    // });
}

function tableByCountry(dataset) {
    var option = "sport";
    //console.log("Medal data Inside visual.js");
    //console.log(dataset);
    var tableData = dataset;

    var countrySel = dataset.map(countryFn => countryFn.Country).filter(distinct)
    const [country] = countrySel

    var sportsList = []
    var sportsData = dataset.map(sportListFn => sportListFn.Sport);

    sportsData.forEach((sportName) => {
        if (!(sportsList.includes(sportName))) {
            sportsList.push(sportName);

        }
    })

    var medalObj = [];
    sportsList.forEach((sportName) => {
        var sportItem = {};

        var goldMedal = dataset.filter(medalFn => (medalFn.Sport === sportName) && (medalFn.Medal === "Gold"));
        var silverMedal = dataset.filter(medalFn => (medalFn.Sport === sportName) && (medalFn.Medal === "Silver"));
        var bronzeMedal = dataset.filter(medalFn => (medalFn.Sport === sportName) && (medalFn.Medal === "Bronze"));
        //console.log(sportName+":"+goldMedal.length+":"+silverMedal.length+":"+bronzeMedal.length)
        sportItem["Sports"] = sportName;
        sportItem["Gold"] = goldMedal.length;
        sportItem["Silver"] = silverMedal.length;
        sportItem["Bronze"] = bronzeMedal.length;
        sportItem["TotalMedal"] = goldMedal.length + silverMedal.length + bronzeMedal.length;
        medalObj.push(sportItem);

        createPlot(medalObj, country, option);
    })



    // var tableBody = d3.select("tbody");
    // tableBody.html("");

    // medalObj.forEach( (medalStat) =>{
    //     var medalRow = tableBody.append("tr");

    //     Object.entries(medalStat).forEach(([key,value]) => {

    //         var medalCell = medalRow.append("td");
    //         medalCell.text(value);
    //     });
    // });
}

