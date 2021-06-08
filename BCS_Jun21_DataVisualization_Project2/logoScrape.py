
import pandas as pd

import requests
from splinter import Browser
from bs4 import BeautifulSoup as bs
import urllib.request  as urllib2 
import time
from pprint import pprint
from webdriver_manager.chrome import ChromeDriverManager
import pymongo
import json
from bson import json_util
from bson.json_util import dumps



#Scrape logos from 1896 to 2014
executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)

headline_url = "https://hative.com/olympic-logos-from-1896-to-present/"
browser.visit(headline_url)
#time.sleep(1)
headline_html = browser.html
soup = bs(headline_html, "html.parser")

name_list = []

logo_results = soup.find_all('h2')
for name in logo_results:
    n = name.text
    name_list.append(n)    
#print(name_list)

name_list = name_list[1:-1]
#print(name_list)

source_list = []
source_results = soup.find_all("img",class_='lazy')
#s = source_results[0]
for source in source_results:
    if source.has_attr('data-src'):
        s = source['data-src']
        if s.find("olympic") == -1:
            continue;
        else:
            source_list.append(source['data-src'])
#print(source_list)

olympic_logos = dict(zip(name_list, source_list))
print(olympic_logos)

browser.quit()

#Scrape logos for 2014, 2016, 2018
executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=False)

logo_url = "https://colorlib.com/wp/all-olympic-logos-1924-2022/"
browser.visit(logo_url)
#time.sleep(1)
logo_html = browser.html
soup = bs(logo_html, "html.parser")
#print(soup.prettify())

results = soup.find_all("div",class_="single-blog-content entry wpex-mt-20 wpex-mb-40 wpex-clr")

name_list2 = []
include_list = ["2014","2016","2018"]

logo_results = soup.find_all('h3')
for name in logo_results:
    n = name.text
    
    name_list2.append(n)

res_name_list1 = []
for n in name_list2:
    for il in include_list:
        if n.find(il) == -1:
            continue;
        else:
            res_name_list1.append (n)
            
#print(res_name_list1)

source_list2 = []
include_list1 = ["2014_","2016_","2018_"]
source_results2 = soup.find_all('a', href=True)
for sr in source_results2:
    link = sr['href']
    for il in include_list1:
        if link.find(il) == -1:
            continue;
        else:
            source_list2.append(link)
#print(source_list2)   

olympic_logos2 = dict(zip(res_name_list1, source_list2))
print(olympic_logos2)

browser.quit()

#Merge all logos into 1 dictionary
def Merge(dict1, dict2):
    res = {**dict1, **dict2}
    return res 

olympic_logos_all_years = Merge(olympic_logos, olympic_logos2)
#print(olympic_logos_all_years)

olympic_df = pd.DataFrame(list(olympic_logos_all_years.items()),columns = ['Games','Logo_url'])
#olympic_df

olympic_df['Year'] = olympic_df['Games'].str[-4:]
#olympic_df
olympic_df['Year'] = olympic_df['Year'].astype(int)

olympic_df['Event'] = olympic_df['Games'].str[0:-5]

import pandas as pd

import pymongo

#Replace with mondo DB username/password with read-write access
conn_str=f'mongodb+srv://supriyaDA:Priya1008@supriyada.h7evx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn_str)

db = client.Olympics_Data_db
collection = db.athlete_record

dataset_df = pd.DataFrame.from_records(collection.find())
#dataset_df.head()

dataset_summer_df = dataset_df.loc[dataset_df['Season'] == 'Summer']
#dataset_summer_df

yearList = []
for year in (dataset_summer_df.Year.unique()):
    yearList.append(year)
print(yearList)

olympic_summer_df = olympic_df.loc[olympic_df['Year'].isin(yearList)]
#olympic_summer_df

olympic_summer_list_df = olympic_summer_df[olympic_summer_df['Games'].str.contains('Winter') == False]
olympic_summer_list_df

#json = json.dumps(olympic_summer_list_df.to_dict())
#f = open("dict.json","w")
#f.write(json)
#f.close()
collection1 = db.logo_info
results = collection1.find()
if results.count() >= 1:
    collection1.drop()

#Insert the olympics dataset into database
collection1.insert_many(olympic_summer_list_df.to_dict('records'))
print("Completed!!!!")
print(olympic_summer_list_df.to_dict('records'))
print(olympic_summer_list_df.to_dict())

#collection1.replace_one({}, olympic_summer_list_df.to_dict('records'), True)





