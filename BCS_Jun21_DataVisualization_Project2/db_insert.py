import pandas as pd

import pymongo

df_csv = pd.read_csv('Resources/athlete_events.csv',encoding = "utf-8")
df_csv.head()

#Replace with mondo DB username/password with read-write access
conn_str=f'mongodb+srv://supriyaDA:Priya1008@supriyada.h7evx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn_str)

db = client.Olympics_Data_db
collection = db.athlete_record

results = collection.find()
if results.count() >= 1:
    collection.drop()

#Insert the olympics dataset into database
collection.insert_many(df_csv.to_dict('records'))
print("Completed!!!!")

#Update statement to update the "nan" values in Medal column
'''collection.update_many({"Medal":float('nan')}, {'$set': {"Medal": "None"}})'''