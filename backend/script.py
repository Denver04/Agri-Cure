import os
import cv2
import numpy as np
from keras.models import load_model
from skimage import io
# import pickle
# import json
from ultralytics import YOLO

parent_dir = os.getcwd()

for _,_,files in os.walk('uploads', topdown=True):
        # print (files)
        for file in files:
                img_name = file
                img = io.imread(os.path.join('uploads', file))
                # print(img)
                os.remove(os.path.join('uploads', file))

def process_image(img):   
    # mapping dict
    
    try:   
        img_cnn = cv2.resize(img,(200,200))
        # img_svm = cv2.resize(img,(100,100))
        
        # img_svm = cv2.cvtColor(img_svm, cv2.COLOR_BGR2GRAY)
        # img_svm = np.reshape(img_svm, (1,-1))
        #--------------------------YOLO---------------------------------
        dir = '../frontend/src/saves'
        # parent_dir = os.getcwd()
        save_dir = os.path.join(parent_dir, dir)
        yolo = YOLO('best.pt')
        yolo_output = yolo.predict(source=img, save = False)
        if yolo_output[0].__len__() == 0:
            return 62
        elif yolo_output[0].__len__() > 1:
            if not os.path.exists(save_dir):
                os.mkdir(save_dir)
                
            os.chdir(save_dir)
            box_img = yolo_output[0].plot(pil=True, conf=False)
            cv2.imwrite(img_name, box_img)
            os.chdir(parent_dir)  
        
            return 65
        else:
            if not os.path.exists(save_dir):
                os.mkdir(save_dir)
                
            os.chdir(save_dir)
            box_img = yolo_output[0].plot(pil=True, conf=False)
            cv2.imwrite(img_name, box_img)
            os.chdir(parent_dir)  
        
        #--------------------------YOLO---------------------------------
        
        # with open('leaf_or_not_svm', 'rb') as f:
        #     model_leaf_or_not = pickle.load(f)
        # f.close()
        
        # isleaf = 0
        
        # isleaf = model_leaf_or_not.predict(img_svm)
        # if(isleaf == -1):
        #     # out_dict["Leaf not detected in the image. Please try again with a clear image of a leaf."] = np.random.randint(1, 1000000)
        #     # return out_dict
        #     return (62)
        # elif (isleaf == 1):
            model = load_model(os.path.join(parent_dir,'Model_v1_resnet50_4epoch'))
            img_tensor = np.expand_dims(img_cnn, axis=0)
            fast_pred = model(img_tensor, training=False)
            key = np.argmax(fast_pred)
                # print(d[key])
                # with open('Result.json', 'r') as f:
                #     label_mapping = json.load(f)
                # f.close()
                # out_dict[d[key]] = label_mapping[d[key]]
                # return out_dict,np.random.randint(1, 1000000)
            return (key)         
        # else:
            # out_dict["Some unexpected error occurred(isleaf = 0). Please try again with a clear image of a leaf not a screenshot."] = np.random.randint(1, 1000000) 
            # return out_dict
            # return (63)
    except:
        # out_dict["Some unexpected error occurred. Please try again with a clear image of a leaf not a screenshot."] = np.random.randint(1, 1000000)
        # return out_dict
        return (64)


zee = process_image(img)
    # print(zee , "huadad")
print(zee)
