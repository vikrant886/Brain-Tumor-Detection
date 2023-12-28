from keras.preprocessing import image
from keras.models import load_model
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time

# Load the pre-trained model
# Enter the path to the pre-trained Model
path=""
model_path = path
loaded_model = load_model(model_path)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def save_image(image_data):
    filename = os.path.join('processed_image.png')
    with open(filename, 'wb') as f:
        f.write(image_data)
    return filename


@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        image = request.files['image']

        image_data = image.read()

        # Process the image as needed
        processed_image_path = save_image(image_data)

        # Print the filename
        print(f"Received image: {image.filename}")

        # Get the predicted class
        predicted_class = preprocess_image(processed_image_path)

        # Return the predicted class as a JSON response
        time.sleep(2)
        return jsonify({'message': 'Image uploaded successfully', 'predicted_class': int(predicted_class)})
    except Exception as e:
        return jsonify({'error': str(e)})


# Function to preprocess an image for prediction
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return predict_tumor(img_array)


def predict_tumor(img_array):
    # Make predictions
    predictions = loaded_model.predict(img_array)

    prediction_class = predictions.argmax()

    # Print the predicted class
    print("Predicted Class:", prediction_class)

    return prediction_class


if __name__ == '__main__':
    app.run(port=4000)
