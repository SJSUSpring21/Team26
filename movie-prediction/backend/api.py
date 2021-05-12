from flask import Flask,jsonify
import pickle
from flask import request
import numpy as np
import random

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
import math
import os
# from flask_caching import Cache;
# import surprise
# from surprise import Reader, Dataset, SVD
# from surprise.model_selection import cross_validate
# from cachetools import cached,TTLCache
from flask_cors import CORS, cross_origin

import warnings; warnings.simplefilter('ignore')
import pickle
import joblib

# cache = Cache(config={'CACHE_TYPE': 'SimpleCache'})
# cache.init_app(app)





app=Flask(__name__)
app.config['DEBUG'] = True


cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# cache=TTLCache(maxsize=500,ttl=60)


# @cached(cache)
# # @app.route('/loadmodel',methods=['GET'])
# def loadmodel():
   
#     filename = r'C:\Users\Checkout\finalized_model.sav'
#     # global loaded_model
#     loaded_model = pickle.load(open(filename, 'rb'))

#     print("Model loaded!")
#     return loaded_model
    

@app.route('/genre',methods=['POST'])

def genre():
    print("Inside Genre")
    genre = request.json['genre']
    start_index = request.json['startIndex']
    final_index = request.json['endIndex']
    print(genre)
    print(start_index)
    print(final_index)
    print(type(start_index))
    print(type(final_index))
    final_index=float(final_index)
    print(type(final_index))
    final_index=final_index-0.1
    final_index=str(final_index)
    
    moviedf = pd.read_csv(r"unique10000 (1).csv", sep = None)
    # test_text = input ("Enter genre: ")

    moviegenredf = moviedf[moviedf.Genre.str.contains(genre,case=False)]

    # # start_index = input ("Enter start index: ")
    # # final_index = input ("Enter final index: ")
    # start_index2 = int(start_index)
    # final_index2 = int(final_index)

    movieGenreratingsdf = moviegenredf[(moviegenredf['Imdb'] >= start_index) & (moviegenredf['Imdb'] <= final_index)]

    movieGenreratingsdf2 = movieGenreratingsdf[['Title', 'Imdb']].sort_values(by = ['Imdb'])
    movieGenreratingsdflist = movieGenreratingsdf2.values.tolist()


    movieGenreratingsdflist=movieGenreratingsdflist
    print(movieGenreratingsdflist)
    # JSONP_data = jsonpify(df_list)

    return jsonify(movieGenreratingsdflist)

@app.route('/recommendation',methods=['POST'])

def recommendation():
    title=  request.json['title']
    print("Inside recommendation")
    print("Hi")
    print("Title:",title)
    # credits = pd.read_csv('credits.csv')
    # keywords = pd.read_csv('keywords.csv')
    # links_small = pd.read_csv('links_small.csv')
    # md = pd.read_csv('movies_metadata.csv')
    # ratings = pd.read_csv('ratings_small.csv')
    # links_small = links_small[links_small['tmdbId'].notnull()]['tmdbId'].astype('int')
    
    # def convert_int(x):
    #     try:
    #         return int(x)
    #     except:
    #         return np.nan
    
    # md['id'] = md['id'].apply(convert_int)
    # md[md['id'].isnull()]
    # md = md.drop([19730, 29503, 35587])
    # md['id'] = md['id'].astype('int')
    # smd = md[md['id'].isin(links_small)]
    
    # smd['tagline'] = smd['tagline'].fillna('')
    # smd['description'] = smd['overview'] + smd['tagline']
    # smd['description'] = smd['description'].fillna('')

    # smd = smd.reset_index()
    smd=pd.read_csv(r"final_movies.csv")
    titles = smd['title']
    indices = pd.Series(smd.index, index=smd['title'])

    cosine_from_joblib2 = joblib.load('filename7.gz')

    def get_recommendations(title):
        idx = indices[title]
        sim_scores = list(enumerate(cosine_from_joblib2[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:31]
        movie_indices = [i[0] for i in sim_scores]
        
        OP=titles.iloc[movie_indices]
        output=OP.to_dict()
        result=[]
        all_values=output.values()
        value_list=list(all_values)[0:7]
        print("No problem")
        for value in value_list:
            result.append(value)
        
        return result
    return jsonify(get_recommendations(title))

@app.route('/imdbpredict',methods=['POST'])

def imdbpredict():

    movie = request.json["movie"]
    director = request.json["director"]
    actor1 = request.json["actor1"]
    actor2 = request.json["actor2"]
    genre = request.json["genre"]

    def stringToInt(string):
        integer = 0
    #try seeing if string value given is already a number if so the output would be
        try:
        #means string value given is already a int
            integer = int(string)
        except:
            string = string.lower()
            for i in string:
                integer += ord(i)
        return integer


# data = pd.read_csv("/content/drive/My Drive/Colab Notebooks/Danesh 272/movies2.csv", encoding="latin-1")
# data2 = pd.read_csv("/content/drive/My Drive/Colab Notebooks/Danesh 272/moviesdata7.csv", encoding="latin-1")
    data3 = pd.read_csv(r"moviesdata7.csv", encoding="latin-1")
# print(data3)

    # for i in range(4):
    #     data3 = data3.drop(data3.columns[-1], axis=1)

# print(data3.describe())
    print()
    data3.drop_duplicates(subset=None, keep='first', inplace=True, ignore_index=False)
# print(data3)

    data3 = data3.values.tolist()
    for i in range(0,10):
        print(data3[i])

    X_train = []
    y_train = []


    for i in range(len(data3)):
        X_train.append([data3[i][0], data3[i][2], data3[i][3], data3[i][4], data3[i][5]])
        y_train.append(data3[i][1])

# print(f"X_train --> {X_train}")
# print(f"y_train --> {y_train}")

    for i in range(len(X_train)):
        for j in range(len(X_train[i])):
            X_train[i][j] = stringToInt(X_train[i][j])

# print(X_train[0])
# print(f"X_train --> {X_train}")
# print(f"y_train --> {y_train}")

    for i in range(len(y_train)):
        y_train[i] = int(float(y_train[i])*10)
#     print(y_train[i])



# model = DecisionTreeClassifier()
    model = RandomForestClassifier(random_state=42)

    model.fit(X_train, y_train)

    print()


    # movie = input("Enter the name of the movie: ")
    movie = movie.lower()
    movie = stringToInt(movie)

    # director = input("Enter the name of the director: ")
    director = director.lower()
    director = stringToInt(director)

    # actor1 = input("Enter the name of the first actor: ")
    actor1 = actor1.lower()
    actor1 = stringToInt(actor1)

# actor2 = input("Enter the name of the second actor: ")
    actor2 = actor2.lower()
    actor2 = stringToInt(actor2)

    # genre = input("Enter the main genre of the movie: ")
    genre = genre.lower()
    genre = stringToInt(genre)

# budget = int(input("Enter the budget for the movie: "))

    prediction = model.predict([[movie, genre, actor1, director, actor2]])
    return jsonify(prediction[0]/10)
    
    print(f"The predicted IMDb Rating for the above combination is: {prediction[0]/10}/10")

    
    


@app.route('/getallmovies',methods=['GET'])

def getMovies():
    print("Inside Get all movies")
    all_data=pd.read_csv(r"final_movies.csv")
    titles=list(all_data['title'])
    
    return jsonify(titles)
    



@app.route('/getallactors1',methods=['GET'])

def getActors1():
    print("Inside Get all actors")
    all_data=pd.read_csv(r"moviesdata7.csv")
    actors = list(all_data["Actor1"].unique())
    
    return jsonify(actors)

@app.route('/getallactors2',methods=['GET'])

def getActors2():
    print("Inside Get all actors2")
    all_data=pd.read_csv(r"moviesdata7.csv")
    actors = list(all_data["Actor2"].unique())
    
    return jsonify(actors)

@app.route('/getdirectors',methods=['GET'])

def getDirectors():
    print("Inside all Directors")
    all_data=pd.read_csv(r"moviesdata7.csv")
    directors = list(all_data["Director"].unique())
    
    return jsonify(directors)







    








# @app.route('/api',methods=['POST'])

# def api():
#     loadmodel()
#     print("Inside API")
#     title=  request.json['title']
#     print(title)
    
#     md = pd. read_csv(r"movies_metadata.csv")
#     md['genres'] = md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])

#     vote_counts = md[md['vote_count'].notnull()]['vote_count'].astype('int')
#     vote_averages = md[md['vote_average'].notnull()]['vote_average'].astype('int')
#     C = vote_averages.mean()
#     print(C)

#     m = vote_counts.quantile(0.95)
#     print(m)

#     md['year'] = pd.to_datetime(md['release_date'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)

#     qualified = md[(md['vote_count'] >= m) & (md['vote_count'].notnull()) & (md['vote_average'].notnull())][['title', 'year', 'vote_count', 'vote_average', 'popularity', 'genres']]
#     qualified['vote_count'] = qualified['vote_count'].astype('int')
#     qualified['vote_average'] = qualified['vote_average'].astype('int')
#     print(qualified.shape)

#     def weighted_rating(x):
#         v = x['vote_count']
#         R = x['vote_average']
#         return (v/(v+m) * R) + (m/(m+v) * C)

#     qualified['wr'] = qualified.apply(weighted_rating, axis=1)
#     qualified = qualified.sort_values('wr', ascending=False).head(250)

#     s = md.apply(lambda x: pd.Series(x['genres']),axis=1).stack().reset_index(level=1, drop=True)
#     s.name = 'genre'
#     gen_md = md.drop('genres', axis=1).join(s)

#     def build_chart(genre, percentile=0.85):
#         df = gen_md[gen_md['genre'] == genre]
#         vote_counts = df[df['vote_count'].notnull()]['vote_count'].astype('int')
#         vote_averages = df[df['vote_average'].notnull()]['vote_average'].astype('int')
#         C = vote_averages.mean()
#         m = vote_counts.quantile(percentile)
    
#         qualified = df[(df['vote_count'] >= m) & (df['vote_count'].notnull()) & (df['vote_average'].notnull())][['title', 'year', 'vote_count', 'vote_average', 'popularity']]
#         qualified['vote_count'] = qualified['vote_count'].astype('int')
#         qualified['vote_average'] = qualified['vote_average'].astype('int')
    
#         qualified['wr'] = qualified.apply(lambda x: (x['vote_count']/(x['vote_count']+m) * x['vote_average']) + (m/(m+x['vote_count']) * C), axis=1)
#         qualified = qualified.sort_values('wr', ascending=False).head(250)
    
#         return qualified

#     links_small = pd.read_csv(r"C:\Users\Checkout\links.csv")
#     links_small = links_small[links_small['tmdbId'].notnull()]['tmdbId'].astype('int')

#     md = md.drop([19730, 29503, 35587])
#     md['id'] = md['id'].astype('int')

#     smd = md[md['id'].isin(links_small)]
#     # print(smd.shape)

#     smd['tagline'] = smd['tagline'].fillna('')
#     smd['description'] = smd['overview'] + smd['tagline']
#     smd['description'] = smd['description'].fillna('')

#     tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
#     tfidf_matrix = tf.fit_transform(smd['description'])
#     # print(tfidf_matrix.shape)

    

#     smd = smd.reset_index()
#     titles = smd['title']
#     indices = pd.Series(smd.index, index=smd['title'])

#     def predictrec(title):
#         idx = indices[title]
#         sim_scores = list(enumerate(loaded_model[idx]))
#         sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
#         sim_scores = sim_scores[1:31]
    
#         movie_indices = [i[0] for i in sim_scores]

    
#         OP=titles.iloc[movie_indices]
#         output=OP.to_dict()
#         result=[]
#         all_values=output.values()
#         value_list=list(all_values)[0:7]
#         for value in value_list:
#             result.append(value)
        
#         return result
#     return jsonify(predictrec(title))
   

    
    
    
    
    
    
    
    
    
    
    
    
    # filename = r'C:\Users\Checkout\finalized_model.sav'
    # md = pd. read_csv("movies_metadata.csv")
    # smd = md[md['id'].isin(links_small)]
    # smd.shape
    # smd['tagline'] = smd['tagline'].fillna('')
    # smd['description'] = smd['overview'] + smd['tagline']
    # smd['description'] = smd['description'].fillna('')

    # tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
    # tfidf_matrix = tf.fit_transform(smd['description'])
    # tfidf_matrix.shape
    # smd = smd.reset_index()
    # titles = smd['title']
    # indices = pd.Series(smd.index, index=smd['title'])
    # # loaded_model = pickle.load(open(filename, 'rb'))
    
    # def predictrec(title):
        
    #     idx = indices[title]
    #     sim_scores = list(enumerate(loaded_model[idx]))
    #     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    #     sim_scores = sim_scores[1:31]
    #     movie_indices = [i[0] for i in sim_scores]
    #     return titles.iloc[movie_indices]
    
    # return predictrec(title).head(10)



    

   
    
   
