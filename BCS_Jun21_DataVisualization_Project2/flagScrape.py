import pandas as pd
import pymongo
from pymongo import collection
import requests
from splinter import Browser
from bs4 import BeautifulSoup as bs
import urllib.request  as urllib2 

from selenium import webdriver
from bs4 import BeautifulSoup as soup
import time
import os
from urllib.request import urlopen
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://en.wikipedia.org/wiki/List_of_IOC_country_codes')
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(0.5)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
    
table_data = soup(driver.page_source,'html.parser').find_all('tbody')
#for data in table_data:
 #   print(data)

driver.quit()

my_table = table_data[0]

NOC_country_flag = pd.DataFrame({'NOC':[],
                                'FlagSrc':[],
                                'CountryName':[]})
for data in my_table:
    #print(data)
    if data.find('td') == -1:
        continue;
    else:
        NOC_Code = data.find('td').find('span', {'class':"monospaced"}).text
    flag_src = data.find('img')['src']
    country = data.find('a').text
    
    NOC_country_flag = NOC_country_flag.append({'NOC':NOC_Code,
                                    'FlagSrc':flag_src,
                                    'CountryName':country},ignore_index = True)     
    
    
#print(NOC_country_flag)



conn_str=f'mongodb+srv://supriyaDA:Priya1008@supriyada.h7evx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn_str)

db = client.Olympics_Data_db
#collection = db.athlete_record

#collection1 = db.logo_info
collection2 = db.noc_code
results = collection2.find()
if results.count() >= 1:
    collection2.drop()

#Insert the olympics dataset into database
collection2.insert_many(NOC_country_flag.to_dict('records'))
print("Completed!!!!")
print(NOC_country_flag.to_dict('records'))

#Updated the athlete_record table with country name and flag
'''code_list = []
for row in db.noc_code.find():
    code = row['NOC']
    code_list.append(code)
print(code_list)

for code in code_list:
    country_name = db.noc_code.find_one({ "NOC": code })['CountryName']
    flag_url = db.noc_code.find_one({ "NOC": code })['FlagSrc']
    db.athlete_record.update_many({"NOC": code}, {'$set': {"Country": str(country_name),
                                                           "FlagSrc":flag_url}})

    print("completed" + code)'''

#Few of the NOC codes did not have the countryname... Updated them manually.