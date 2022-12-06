# Building API 
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pickle
import json

app = FastAPI()

class RentItem(BaseModel):
   region: str
   sqfeet: float
   baths: float
   beds: float

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "https://rental-analysis.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
      
with open('./saved/rentAnalyser.pkl', 'rb') as f:
    model = pickle.load(f)

with open("./saved/columns.json", "r") as f:
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
