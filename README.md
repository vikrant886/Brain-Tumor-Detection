# Brain-Tumor-Detection

Aim was to build a Brain tumor Detection Model using various Convulation Neural Network Architectures . That could Determine the presence of a tumor using MRI images of brain 

DataSet used to train the model can be found at : [Link](https://www.kaggle.com/datasets/sartajbhuvaji/brain-tumor-classification-mri/data)

## About the dataset:

The dataset that i have used already contained a data splitted for training and testing , having 4 classes : meningioma_tumor , glioma_tumor , pituitary_tumor and no_tumor

## Data Preprocessing

For every image, the following preprocessing steps were applied:

image in dataset are not needed to be resized as they were of equal sizes and is fit to be processed by the CNN model.
all the images have to be labelled with their class name for prediction.

## Data Split:
The data was split in the following way:

90% of the data for training.
10% of the data for validation.
10% of the data for testing.

## Neural Network Architecture
This is the architecture that I've built:

Neural Network Architecture

Understanding the architecture:
Each input x (image) has a shape of (150, 150, 3) and is fed into the neural network. And, it goes through the following layers:

Firstly i have applied an VGG-16 architecture containing 13 convulation layers and 3 dense layers , then i have used another Neural Network architecture with 11 convulation layers and 1 dense layer.
for the custom architecture i have used a (3,3) kernel size and relu as activation function.\

![download](https://github.com/vikrant886/Brain-Tumor-Detection/assets/94632119/a59eea09-3493-474b-901b-0ae0877eaa7f)


## Results

| Model     | Validation Accuracy      | Testing Accuracy     |
| ------------- | ------------- | -------- |
| VGG-16          | 89.15         | 83.53  |
| custom(12 layered)           | 92.54         | 89.93  |

## Frontend

Also created a frontend using ReactJs and MUI which would send the MRI images to the backend server running on the pre-trained model for determining the presence of Tumor.
Backend would return the predicted response to the Frontend .
