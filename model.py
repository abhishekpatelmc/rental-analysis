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

# print(data)

# print(data.shape)

# print(data.info())

data.isnull().sum()
data = data.dropna()
data = data.reset_index(drop=True)

# print("There are {} duplicate values.".format(data.duplicated().sum()))
data[data.duplicated(keep=False)].head(10)

rental = data[["sqfeet", "beds", "baths", "parking_options", "state","region","comes_furnished", "type", "price", "laundry_options"]]
# rental.head(10)
# rental["state"].value_counts()
# rental["comes_furnished"].value_counts()
# rental["type"].value_counts()

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

# print(rental.head(10))

# print(rental.info())

#statistics of the Rent Per Mth column
# with pd.option_context('float_format', '{:f}'.format): print(rental["price"].describe())

rental["price"] = rental["price"].apply(pd.to_numeric)
rental["sqfeet"] = rental["sqfeet"].apply(pd.to_numeric)
rental["beds"] = rental["beds"].apply(pd.to_numeric)
rental["baths"] = rental["baths"].apply(pd.to_numeric)

# print(rental.dtypes)
# rental.head(10)

# limit the rentalPerMonth to be less than or equal to RM10,000
rentaldf = rental[rental["price"] <= 6000].reset_index(drop=True)
# rentaldf = pd.DataFrame(rental)
# rentalunder6000.head()

# with pd.option_context('float_format', '{:f}'.format): print(rentalunder6000["price"].describe())

# create distribution plot and boxplot to check for outliers

# plt.subplot(121)
# sns.distplot(rentalunder6000["price"]);

# plt.subplot(122)
# rentalunder6000["price"].plot.box(figsize=(16,5))

# plt.savefig("distribution.png", bbox_inches="tight")

# plt.show()

# rentalunder6000.head()
# rentaldf = pd.DataFrame(rental)
# rentaldf.head()

# plt.figure(figsize=(14, 8))

# plt.subplot(2, 2, 1)
# plt.scatter(x=rentaldf["sqfeet"], y=rentaldf["price"])
# plt.xlabel("sqfeet")
# plt.ylabel("price")

# plt.subplot(2, 2, 3)
# plt.scatter(x=rentaldf["beds"], y=rentaldf["price"])
# plt.xlabel("beds")
# plt.ylabel("price")

# plt.subplot(2, 2, 2)
# plt.scatter(x=rentaldf["baths"], y=rentaldf["price"])
# plt.xlabel("baths")
# plt.ylabel("price")

# plt.savefig("scatterplots.png", bbox_inches="tight")
# plt.show()

# with pd.option_context('float_format', '{:f}'.format): print(rentaldf["beds"].describe())
# with pd.option_context('float_format', '{:f}'.format): print(rentaldf["baths"].describe())
# with pd.option_context('float_format', '{:f}'.format): print(rentaldf["sqfeet"].describe())

# limit the bed room number, bathroom and sqfeet 
# rentaldf = rentaldf[rentaldf["beds"] <= 10].reset_index(drop=True)
# rentaldf = rentaldf[rentaldf["baths"] <= 10].reset_index(drop=True)
# rentaldf = rentaldf[rentaldf["sqfeet"] <= 40000].reset_index(drop=True)

# with pd.option_context('float_format', '{:f}'.format): print(rentaldf["beds"].describe())
# with pd.option_context('float_format', '{:f}'.format): print(rentaldf["baths"].describe())
# with pd.option_context('float_format', '{:f}'.format): print(rentaldf["sqfeet"].describe())

# print("Data type is {0} \n\nShape of dataframe is {1}\n".format(type(rentaldf), rentaldf.shape))

# visualize the relationship using scatter plots

# plt.figure(figsize=(14, 8))

# plt.subplot(2, 2, 1)
# plt.scatter(x=rentaldf["sqfeet"], y=rentaldf["price"])
# plt.xlabel("sqfeet")
# plt.ylabel("price")

# plt.subplot(2, 2, 3)
# plt.scatter(x=rentaldf["beds"], y=rentaldf["price"])
# plt.xlabel("beds")
# plt.ylabel("price")

# plt.subplot(2, 2, 2)
# plt.scatter(x=rentaldf["baths"], y=rentaldf["price"])
# plt.xlabel("baths")
# plt.ylabel("price")

# plt.savefig("scatterplots.png", bbox_inches="tight")
# plt.show()

# rentaldf.head()

rentaldf = rentaldf[["sqfeet", "beds", "baths", "region", "price"]]
# rentaldf.head(10)

# calculate correlation matrix
corr = rentaldf[["sqfeet", "baths", "beds", "price"]].corr()
corr

# visualize correlation matrix
# plt.subplots(figsize=(8,6))

# fig = sns.heatmap(corr, 
#             xticklabels=corr.columns.values,
#             yticklabels=corr.columns.values)

# fig.get_figure().savefig("corr_heatmap.png", bbox_inches="tight") 


# one hot encoding
rentalEncode = pd.get_dummies(rentaldf.region)

# rentalEncode.head()

df11 = pd.concat([rentaldf, rentalEncode], axis='columns') 
# df11.head()

# check summary info to see if one hot encoding is done properly
# print(df11.shape, "\n")
# df11.info()
# df11.region

df_regions = df11.copy().drop_duplicates(subset = "region")
df_regions = df_regions[['region']]

# separate data into X features and Y target
df11["region"] = [int(df_regions.index[df_regions['region'] == i].tolist()[0]) for i in df11["region"]]
X = df11.drop(columns=["price"])
Y = df11.price

# split data into random train and test subsets

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=0)

# X_train.head()

# fit a Linear Regression Model

regressor = LinearRegression()
regressor.fit(X_train, y_train)
print(regressor.score(X_train, y_train))

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
print(predict_price('winston-salem',1900, 3, 2) )
   