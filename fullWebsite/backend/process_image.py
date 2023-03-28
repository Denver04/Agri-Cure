import cv2
import numpy as np
from keras.models import load_model
from skimage import io
import pickle
import json


def process_image(img_path):
    # load model
    
    
    # mapping dict
    d = {
        0 :  'Apple scab',
        1 :  'Apple Black rot',
        2 :  'Apple Cedar apple rust',
        3 :  'Apple healthy',
        4 :  'Corn (maize) Cercospora leaf spot Gray leaf spot',
        5 :  'Corn (maize) Common rust',
        6 :  'Corn (maize) Northern Leaf Blight',
        7 :  'Corn (maize) healthy',
        8 :  'Grape Black rot',
        9 :  'Grape Esca (Black Measles)',
        10 : 'Grape Leaf blight (Isariopsis Leaf Spot)',
        11 : 'Grape healthy',
        12 : 'Mango apoderus javanicus',
        13 : 'Mango aulacaspis tubercularis',
        14 : 'Mango ceroplastes rubens',
        15 : 'Mango cisaberoptus kenyae',
        16 : 'Mango dappula tertia',
        17 : 'Mango healthy',
        18 : 'Mango icerya seychellarum',
        19 : 'Mango ischnaspis longirostris',
        20 : 'Mango neomelicharia sparsa',
        21 : 'Mango orthaga euadrusalis',
        22 : 'Mango procontarinia matteiana',
        23 : 'Mango sirmictis longicornis',
        24 : 'Mango valanga nigricornis',
        25 : 'Orange Haunglongbing (Citrus greening)',
        26 : 'Peach Bacterial spot',
        27 : 'Peach healthy',
        28 : 'Pepper, bell Bacterial spot',
        29 : 'Pepper, bell healthy',
        30 : 'Potato Early blight',
        31 : 'Potato Late blight',
        32 : 'Potato healthy',
        33 : 'Raspberry healthy',
        34 : 'Rice Bacterial leaf blight',
        35 : 'Rice Brown spot',
        36 : 'Rice Leaf smut',
        37 : 'Soybean healthy',
        38 : 'Squash Powdery mildew',
        39 : 'Strawberry Leaf scorch',
        40 : 'Strawberry healthy',
        41 : 'Tea Anthracnose',
        42 : 'Tea algal leaf',
        43 : 'Tea bird eye spot',
        44 : 'Tea brown blight',
        45 : 'Tea gray blight',
        46 : 'Tea healthy',
        47 : 'Tea red leaf spot',
        48 : 'Tea white spot',
        49 : 'Tomato Bacterial spot',
        50 : 'Tomato Early blight',
        51 : 'Tomato Late blight',
        52 : 'Tomato Leaf Mold',
        53 : 'Tomato Septoria leaf spot',
        54 : 'Tomato Spider mites Two-spotted spider mite',
        55 : 'Tomato Target Spot',
        56 : 'Tomato Tomato Yellow Leaf Curl Virus',
        57 : 'Tomato Tomato mosaic virus',
        58 : 'Tomato healthy',
        59 : 'Wheat Brown Rust',
        60 : 'Wheat Healthy',
        61 : 'Wheat Yellow Rust'
    }
    try:
        img = io.imread(img_path)
        print(img_path)
        img_cnn = cv2.resize(img,(200,200))
        img_svm = cv2.resize(img,(100,100))
        
        img_svm = cv2.cvtColor(img_svm, cv2.COLOR_BGR2GRAY)
        img_svm = np.reshape(img_svm, (1,-1))
        
        
        with open('D:/ajhu2/gfg-hackthon/fullWebsite/backend/leaf_or_not_svm', 'rb') as f:
            model_leaf_or_not = pickle.load(f)
        f.close()
        
        
        
        isleaf = model_leaf_or_not.predict(img_svm)
        if(isleaf == -1):
            return ("Leaf not detected in the image. Please try again with a clear image of a leaf.", np.random.randint(1, 1000000))
        else:
            model = load_model('D:/ajhu2/gfg-hackthon/fullWebsite/backend/Model_v1_resnet50_4epoch')
            img_tensor = np.expand_dims(img_cnn, axis=0)
            fast_pred = model(img_tensor, training=False)
            key = np.argmax(fast_pred)
            print(d[key])
            with open('D:/ajhu2/gfg-hackthon/fullWebsite/backend/Result.json', 'r') as f:
                label_mapping = json.load(f)
            f.close()
            
            return (d[key], label_mapping[d[key]], np.random.randint(1, 1000000))
    except:
        return ("Some unexpected error occurred. Please try again with a clear image of a leaf not a screenshot.", np.random.randint(1, 1000000))
