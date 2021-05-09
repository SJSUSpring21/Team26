from flask import Flask
import pickle
from flask import request
import numpy as np



app=Flask(__name__)

@app.route('/api',methods=['POST'])

def api():
    print("Inside API")
    text=request.json['text']
    print(text)




    # model = load_model("/home/danesh/data-mining/trained_model/model_cv2.h5")
    # print("Loaded model@!")


    # prediction= model.predict(np.array(text))
    # print("After prediction")
    # print(prediction)
    return "OK"

   
    
   
