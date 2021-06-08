# BCS_Jun21_DataVisualization_Project2

#BCS- Project2-Olympic Data Visualization Project-Group B

#Purpose:
The purpose of the project is to study and show different trends and visualization based on the Olympic Summer Games data from 1986 to 2016. 

#Visualization libraries used:
	Packed bubble chart (`HighCharts.js`)
	Stacked bar chart (`Plotly.js`) 
	Map (`leaflet.js`)
	Table & Line subplot s (`Plotly.js`)

#Front End Pages:
	index.html: This is the landing page of the website. This page displays a slider control to choose the different years Olympic was held. On year selection the different visualizations are updated based on years and country selected from the bubble chart. First load is set to default year 1986.
	OlympicData.html: This page gets called from the index.html. This page shows details of different sports, teams, gender participation, medals won by all countries in selected year. The page gives an option of filtering based on different filter criteria and also a set of filters can be applied to the data.


#Data Sources and ETL process
	Created a DB in Mongo atlas(`Olympic_Data_DB`) and collection(`athlete_record`) with the data collected from Kaggle dataset. The Medal column did not have a consistent datatype like when the Medal is "NA", it is not of string format. Hence we updated all the documents to have "None"(String datatype) in place of "NA".`mongodb+srv://{username}:{password}@******.h7evx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

	Web scraping is done (using BeautifulSoup) to collect the logo for all the summer events. The collection `logo_info` is created with Event Name, Year and logo_url collected from the scraping. The website used is:
`https://hative.com/olympic-logos-from-1896-to-present/`
`https://colorlib.com/wp/all-olympic-logos-1924-2022/`

	Web scraping is done (using Selenium) to collect the NOC (National Olympics Committee) code with the actual country names. The website used is: `https://en.wikipedia.org/wiki/List_of_IOC_country_codes`

	The collection: `athlete_record` is then updated with country name corresponding to their NOC code.

#DB Connection establishment
o	Connection URL = 'mongodb+srv://projectOlympics:project123@******.h7evx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
o	Client = pymongo. MongoClient(connection_url)
o	Database = client.get_database('Olympics_Data_db')

	Collection
o	Data Table = Database.athlete_record
o	Logo Table = Database.logo_info

#Flask API routes used:
	@app.route("/”) Default page load
	@app.route('/find/’)  Returns Json object with data for a particular year
	@app.route('/findByYear')   Collects the year info onclick the card and redirects to ('/find') to fetch from db.
	@app.route('/findByCountry')  Returns JSON object with filter conditions year & country.
	@app.route('/OlympicData', methods=['GET', 'POST'])   To redirect to the another html page `OlympicData.html`.

#Intermediary Code / .JS Files 
	slider.js --> pipelines the data between database, html file & visualization script files.
Carousel slider:
o	The carousel slider is created dynamically with the data from flask. 
o	It is animated to scroll through all the available year to select.
o	Event listener, onclick () is associated with the button which has year as value.
o	Onclick () the button, the year get fetched by the flask and redirects the JSON outputs to all the visualization scripts. It is in turn displayed as visuals for the user.

	Queue.js --> This library invokes the route ('/find') and wait till the data is available from database. Once the data is available the data is passed on to the function `ready()` which then redirects to all other visualization scripts.

#Data Visualization JS Files

1	TableVisualization.js: 
    If year is chosen, an object is created with country name and medal information and tableplotvisualization.js is invoked.
o	If country is chosen (from bubble chart), an object is created with sports in which the countries participated and their medal information and tableplotvisualization.js is invoked.

2	Tableplotvisualization.js: 
o	Plots the Object into table format and the line plot with shared x-axes. 
o	The y-axes are plotted against the number gold, silver or bronze medal won by country or by all countries in a year.

3	GenderVisualization.js
o	Once data is loaded from the slider.js the gendervisulization.js file will load the data points from the users chosen year and country. The main part of this function is the accumulator object. Data for each row is passed through the for loop. First a constant “current” is defined that selects the I’th role of data. Then using that current, key values “sex” and “sporting event” are selected. Once these are selected the first if statement checks if the accumulator has a property for gender. This property will only be male or female. The constant “thing” creates male and female objects. Once these objects are created the second if statement checks if each object (gender) has a unique sporting event (ex {M: {Swimming:1}) if the event occurs for the first time it is given account of 1 if the event repeats the count is added to the event for the given gender.
o	Once the accumulator runs through all of the data it is loaded into a plotly stack chart. In some cases, there are no females participating - there is an if clause to check if females are undefined in that case the chart will only display males. If there is both male and female data, there are two variables trace 1 and 2 representing these stacking. The x and y variables within the trace pulls the keys and values from the accumulator as object. (ex. X: Object. Keys(male) and y: object. Values(males) and females respectively.) A new plot is defined appending the ‘new_bar’ id within the index.html.

4	Map Visualization.js
o	Map Visualization purpose is to plot the countries which have participated in Olympics and on mouse click show the medal count for that country. Map initially loads with 1986 data. 
o	The file gets a call from slider with the data for the selected year.
o	This data is then read and GeoJSON features are created. Two data are used to create this visualization.  One is the input from slider.js, which send the Olympic data as per year, and other is the static file Countries.geojson with all countries and their co-ordinates.
o	In create features function, the countries.geojson is filtered with the unique countries that participated in Olympic for that year. This data is done to plot the layers; random colors are assigned to these countries on each feature.
o	This data is them passed to plot a Map. Map box is used to plot the map.

5	BubbleVisualization.js
o	The bubbles Visualization purpose is to be the event listener to select the country we want the other visualizations to show. It also acts as a representation on the amount of medals the countries won collectively in all sports, including all genders for the selected year (from the slider). The bubble chart initially loads with 1986 data. 
o	The file gets a call from slider with the data for the selected year.
o	This file then has clickval() function which stores the country selected so then the other js files can reference it. 
o	There are many Highchart JavaScript scripts included in index.html which make the bubbles move( like magnets) 

6	TabularData.js
o	This visualization is used to display details of participation for the selected year. Initial load will be for year 1986.
o	This displays the Event, City, Sport, Medal, Gender, Player details etc. for all countries.
o	User is given an option to filter this data.
o	User can filter data dynamically on drop down item change.
o	User can also filter for multiple condition. 

#Heroku Deployment Completed for the above project. Link is https://olympics-race-to-gold.herokuapp.com/


















