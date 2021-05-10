from flask import Flask,jsonify
import pickle
from flask import request
import numpy as np

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
# import surprise
# from surprise import Reader, Dataset, SVD
# from surprise.model_selection import cross_validate


import warnings; warnings.simplefilter('ignore')



app=Flask(__name__)
app.config['DEBUG'] = True

@app.route('/api',methods=['POST'])

def api():
    print("Inside API")
    title=  request.json['title']
    print(title)
    
    md = pd. read_csv(r"C:\Users\Checkout\movies_metadata.csv")
    md['genres'] = md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])

    vote_counts = md[md['vote_count'].notnull()]['vote_count'].astype('int')
    vote_averages = md[md['vote_average'].notnull()]['vote_average'].astype('int')
    C = vote_averages.mean()
    print(C)

    m = vote_counts.quantile(0.95)
    print(m)

    md['year'] = pd.to_datetime(md['release_date'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)

    qualified = md[(md['vote_count'] >= m) & (md['vote_count'].notnull()) & (md['vote_average'].notnull())][['title', 'year', 'vote_count', 'vote_average', 'popularity', 'genres']]
    qualified['vote_count'] = qualified['vote_count'].astype('int')
    qualified['vote_average'] = qualified['vote_average'].astype('int')
    print(qualified.shape)

    def weighted_rating(x):
        v = x['vote_count']
        R = x['vote_average']
        return (v/(v+m) * R) + (m/(m+v) * C)

    qualified['wr'] = qualified.apply(weighted_rating, axis=1)
    qualified = qualified.sort_values('wr', ascending=False).head(250)

    s = md.apply(lambda x: pd.Series(x['genres']),axis=1).stack().reset_index(level=1, drop=True)
    s.name = 'genre'
    gen_md = md.drop('genres', axis=1).join(s)

    def build_chart(genre, percentile=0.85):
        df = gen_md[gen_md['genre'] == genre]
        vote_counts = df[df['vote_count'].notnull()]['vote_count'].astype('int')
        vote_averages = df[df['vote_average'].notnull()]['vote_average'].astype('int')
        C = vote_averages.mean()
        m = vote_counts.quantile(percentile)
    
        qualified = df[(df['vote_count'] >= m) & (df['vote_count'].notnull()) & (df['vote_average'].notnull())][['title', 'year', 'vote_count', 'vote_average', 'popularity']]
        qualified['vote_count'] = qualified['vote_count'].astype('int')
        qualified['vote_average'] = qualified['vote_average'].astype('int')
    
        qualified['wr'] = qualified.apply(lambda x: (x['vote_count']/(x['vote_count']+m) * x['vote_average']) + (m/(m+x['vote_count']) * C), axis=1)
        qualified = qualified.sort_values('wr', ascending=False).head(250)
    
        return qualified

    links_small = pd.read_csv(r"C:\Users\Checkout\links.csv")
    links_small = links_small[links_small['tmdbId'].notnull()]['tmdbId'].astype('int')

    md = md.drop([19730, 29503, 35587])
    md['id'] = md['id'].astype('int')

    smd = md[md['id'].isin(links_small)]
    # print(smd.shape)

    smd['tagline'] = smd['tagline'].fillna('')
    smd['description'] = smd['overview'] + smd['tagline']
    smd['description'] = smd['description'].fillna('')

    tf = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(smd['description'])
    # print(tfidf_matrix.shape)

    filename = r'C:\Users\Checkout\finalized_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    print("Model loaded!")

    smd = smd.reset_index()
    titles = smd['title']
    indices = pd.Series(smd.index, index=smd['title'])

    def predictrec(title):
        idx = indices[title]
        sim_scores = list(enumerate(loaded_model[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:31]
    
        movie_indices = [i[0] for i in sim_scores]

    
        OP=titles.iloc[movie_indices]
        output=OP.to_dict()
        result=[]
        all_values=output.values()
        value_list=list(all_values)[0:7]
        for value in value_list:
            result.append(value)
        
        return result
    return jsonify(predictrec(title))
   

    
    
    
    
    
    
    
    
    
    
    
    
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



    

   
    
   
