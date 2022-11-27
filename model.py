# Model 
# import libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt 
import seaborn as sns
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
#ignore annoying warning (from sklearn and seaborn)
import warnings
def ignore_warn(*args, **kwargs):
    pass
warnings.warn = ignore_warn 


client = MongoClient()
db = client['rentalDatabase']
collection = db.rentalData
data = pd.DataFrame(list(collection.find()))

data.isnull().sum()
data = data.dropna()
data = data.reset_index(drop=True)


data[data.duplicated(keep=False)].head(10)
rental = data[["sqfeet", "beds", "baths", "parking_options", "state","region","comes_furnished", "type", "price", "laundry_options"]]

# drop sqfeet = 0
rental = rental[rental["sqfeet"] != 0].reset_index(drop=True)
# drop sqfeet > 0
rental = rental[rental["sqfeet"] <= 6000].reset_index(drop=True)
# drop beds = 0
rental = rental[rental["beds"] != 0].reset_index(drop=True)
# drop beds > 50
rental = rental[rental["beds"] <= 10].reset_index(drop=True)
# drop baths = 0
rental = rental[rental["baths"] != 0].reset_index(drop=True)
# drop baths > 100
rental = rental[rental["baths"] <= 10].reset_index(drop=True)
# drop price = 0
rental = rental[rental["price"] != 0].reset_index(drop=True)


rental["price"] = rental["price"].apply(pd.to_numeric)
rental["sqfeet"] = rental["sqfeet"].apply(pd.to_numeric)
rental["beds"] = rental["beds"].apply(pd.to_numeric)
rental["baths"] = rental["baths"].apply(pd.to_numeric)

# limit the rentalPerMonth to be less than or equal to RM10,000
rentaldf = rental[rental["price"] <= 6000].reset_index(drop=True)

rentaldf = rentaldf[["sqfeet", "beds", "baths", "region", "price"]]
# rentaldf.head(10)

# one hot encoding
rentalEncode = pd.get_dummies(rentaldf.region)

df11 = pd.concat([rentaldf, rentalEncode], axis='columns') 
# df11.head()

df_regions = df11.copy().drop_duplicates(subset = "region")
df_regions = df_regions[['region']]

# separate data into X features and Y target
df11["region"] = [int(df_regions.index[df_regions['region'] == i].tolist()[0]) for i in df11["region"]]
X = df11.drop(columns=["price"])
Y = df11.price

# split data into random train and test subsets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=0)

# fit a Linear Regression Model
regressor = LinearRegression()
regressor.fit(X_train, y_train)
print("Accracy:",regressor.score(X_train, y_train))

# make predictions
y_pred = regressor.predict(X_test)

# print(X.columns)
def predict_price(region,sqfeet, baths, beds):
    regions = np.where(X.columns==region)[0]
    if len(regions) == 0:
        return None
    
    loc_index = np.where(X.columns==region)[0][0]
    x = np.zeros(len(X.columns))
    x[0] = sqfeet
    x[1] = baths
    x[2] = beds
    if loc_index >= 0:
        x[loc_index] = 1
        
    return regressor.predict([x])[0]

#region, sqfeet, baths, beds
print("Price: ",predict_price('birmingham',1900, 3, 2))
   