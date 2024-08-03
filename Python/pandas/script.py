import requests
import pandas as pd


df = pd.read_csv("data/survey_results_public.csv")
#pd read txt file
df1 = pd.read_csv("data/README_2023.txt", delimiter='\t')

# Get the first 10 rows of the dataframe
print(df.head(10))

# Get the last 10 rows of the dataframe
print(df1.tail(10))