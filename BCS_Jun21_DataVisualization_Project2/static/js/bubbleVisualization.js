   
    function bubbleChart(dataset){
        //console.log("Inside bubblechart.js")
        //console.log(dataset);
    
   
    
    var countryList = []
        var countryData = dataset.map(countryListFn => countryListFn.NOC);
        countryData.forEach((countryName) => {
            if (!(countryList.includes(countryName))){     
                countryList.push(countryName);
            }
        })

    var countryFullNameList = []
        var countryFullData = dataset.map(countryListFn => countryListFn.Country);
        //console.log(countryFullData)
        countryFullData.forEach((countryfullName) => {
            if (!(countryFullNameList.includes(countryfullName))){     
                countryFullNameList.push(countryfullName);
            }
        })    

        //console.log(countryFullNameList)
        var medalObj = [];
        countryList.forEach((countryName)=> {
            const distinct = (value, index, self)=>{
                return self.indexOf(value) == index;
            }
            var fullNameCountry = dataset.filter(function (medalFn) {
                return medalFn.NOC === countryName;
            }).map(function (country) {
                return country.Country;
            }).filter(distinct)
            const [countryFullname] = fullNameCountry
            //console.log(countryFullname)
        
            var countryItem = {};
            var goldMedal = dataset.filter(medalFn => (medalFn.NOC === countryName) && (medalFn.Medal === "Gold"));
            var silverMedal = dataset.filter(medalFn => (medalFn.NOC === countryName) && (medalFn.Medal === "Silver"));
            var bronzeMedal = dataset.filter(medalFn => (medalFn.NOC === countryName) && (medalFn.Medal === "Bronze"));
            //console.log(countryName+":"+goldMedal.length+":"+silverMedal.length+":"+bronzeMedal.length)
            countryItem["Code"] = countryName;
            countryItem["Country"] = countryFullname;
           
            countryItem["TotalMedal"]  = goldMedal.length + silverMedal.length + bronzeMedal.length;
            medalObj.push(countryItem);
        })
        /*console.log("medalobj")
        console.log(medalObj)
        console.log("countrydata")
        console.log(countryData)*/
        
       
    
    result = [];
    fullName =[];
    medalObj.forEach(function(item) {
        // simple way is to take item as the original form
        //result.push(item); 
        // or do your own way
        var innerList = []
        //for(i=0; i<item.result.length;i++){
            var dict = {"value":item.TotalMedal,
                        "name":item.Code}
            innerList.push(dict);
        //}

        var finalDict = {"name":item.Country, "data":innerList}
        result.push(finalDict)
        
    });
    
    /*console.log("result");
    console.log(result);
    console.log(fullName);*/
    
    Highcharts.chart('container', {
      chart: {
          type: 'packedbubble',
          height: '80%',
          backgroundColor: "transparent"
      },
      title: {
          text: '    '
      },
      subTitle: {
        text: 'Select Country'
      },
      tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.Country} {point.name}:</b> {point.value}</sub>'
      },
      plotOptions: {
        series: {
        cursor: 'pointer',
        point: {
            events: {
              click: function () {
                clickselect(this.name);
                //alert(this.name);
            }
            }
        },
        marker: {
            lineWidth: 1
        }
    },
        
          packedbubble: {
              maxSize: '200%',
              minSize: '50%',
              dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  style: {
                      color: 'black',
                      textOutline: 'none',
                      fontWeight: 'normal'
                  }
              },
              minPointSize: 10
          }
      },
      legend: {
        maxHeight: 75,
        bubbleLegend: {
            
            enabled: false
        }
    },
    series: result
});
    
    }