import cv2
import numpy as np
from skimage import io
from keras.models import load_model

def process_image(img_path):
    # load model
    model = load_model('Model_v1_resnet50_4epoch')
    
    # mapping dict
    d = {
        0 :  'Apple_Apple_scab',
        1 :  'Apple_Black_rot',
        2 :  'Apple_Cedar_apple_rust',
        3 :  'Apple_healthy',
        4 :  'Corn_(maize)_Cercospora_leaf_spot Gray_leaf_spot',
        5 :  'Corn_(maize)_Common_rust_',
        6 :  'Corn_(maize)_Northern_Leaf_Blight',
        7 :  'Corn_(maize)_healthy',
        8 :  'Grape_Black_rot',
        9 :  'Grape_Esca_(Black_Measles)',
        10 : 'Grape_Leaf_blight_(Isariopsis_Leaf_Spot)',
        11 : 'Grape_healthy',
        12 : 'Mango_apoderus_javanicus',
        13 : 'Mango_aulacaspis_tubercularis',
        14 : 'Mango_ceroplastes_rubens',
        15 : 'Mango_cisaberoptus_kenyae',
        16 : 'Mango_dappula_tertia',
        17 : 'Mango_healthy',
        18 : 'Mango_icerya_seychellarum',
        19 : 'Mango_ischnaspis_longirostris',
        20 : 'Mango_neomelicharia_sparsa',
        21 : 'Mango_orthaga_euadrusalis',
        22 : 'Mango_procontarinia_matteiana',
        23 : 'Mango_sirmictis_longicornis',
        24 : 'Mango_valanga_nigricornis',
        25 : 'Orange_Haunglongbing_(Citrus_greening)',
        26 : 'Peach_Bacterial_spot',
        27 : 'Peach_healthy',
        28 : 'Pepper,_bell_Bacterial_spot',
        29 : 'Pepper,_bell_healthy',
        30 : 'Potato_Early_blight',
        31 : 'Potato_Late_blight',
        32 : 'Potato_healthy',
        33 : 'Raspberry_healthy',
        34 : 'Rice_Bacterial_leaf_blight',
        35 : 'Rice_Brown_spot',
        36 : 'Rice_Leaf_smut',
        37 : 'Soybean_healthy',
        38 : 'Squash_Powdery_mildew',
        39 : 'Strawberry_Leaf_scorch',
        40 : 'Strawberry_healthy',
        41 : 'Tea_Anthracnose',
        42 : 'Tea_algal_leaf',
        43 : 'Tea_bird_eye_spot',
        44 : 'Tea_brown_blight',
        45 : 'Tea_gray_blight',
        46 : 'Tea_healthy',
        47 : 'Tea_red_leaf_spot',
        48 : 'Tea_white_spot',
        49 : 'Tomato_Bacterial_spot',
        50 : 'Tomato_Early_blight',
        51 : 'Tomato_Late_blight',
        52 : 'Tomato_Leaf_Mold',
        53 : 'Tomato_Septoria_leaf_spot',
        54 : 'Tomato_Spider_mites Two-spotted_spider_mite',
        55 : 'Tomato_Target_Spot',
        56 : 'Tomato_Tomato_Yellow_Leaf_Curl_Virus',
        57 : 'Tomato_Tomato_mosaic_virus',
        58 : 'Tomato_healthy',
        59 : 'Wheat_Brown_Rust',
        60 : 'Wheat_Healthy',
        61 : 'Wheat_Yellow_Rust'
    }
    img = io.imread(img_path)
    img = cv2.resize(img, (200,200))
    img_tensor = np.expand_dims(img, axis=0)
    fast_pred = model(img_tensor, training=False)
    k = np.argmax(fast_pred)
    return d[k]


