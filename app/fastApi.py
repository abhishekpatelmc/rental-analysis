# Building API 
from fastapi import FastAPI
from pydantic import BaseModel
from mangum import Mangum
import numpy as np
import pickle
import json

app = FastAPI()

handler = Mangum(app, lifespan="off")

class RentItem(BaseModel):
   region: str
   sqfeet: float
   baths: float
   beds: float

with open('./app/model/rentAnalyser.pkl', 'rb') as f:
    model = pickle.load(f)

with open("./app/model/columns.json", "r") as f:
    data_columns = json.load(f)['data_columns']

def get_estimated_price(region, sqfeet, beds, baths):
    try:
        loc_index = data_columns.index(region.lower())
    except:
        loc_index = -1
    x = np.zeros(len(data_columns))
    x[0] = sqfeet
    x[1] = baths
    x[2] = beds
    if loc_index >= 0:
        x[loc_index] = 1
    return round(model.predict([x])[0], 2)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Populate locations to the frontend
@app.get("/getLocation")
async def get_location():
    locations = data_columns[3:]
    return locations

@app.post("/predict")
async def rentModelEndpoint(item: RentItem):
    region = item.region
    sqfeet = item.sqfeet
    baths = item.baths
    beds = item.beds
    prediction = get_estimated_price(region, sqfeet, beds, baths)
    return {"price": prediction}

