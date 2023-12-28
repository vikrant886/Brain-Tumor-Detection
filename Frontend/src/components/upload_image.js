import {React , useState} from "react";
import axios from 'axios';
import Button from '@mui/material/Button/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Upload() {
    const [image, setImage] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleImageUpload = async () => {
        if (!image) {
            alert('Please select an image');
            return;
        }

        try {

            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post('http://localhost:3000/upload', formData);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                setPredictedClass(response.data.predicted_class);
            } else {
                console.error('Error uploading image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <div>
          <h1>Image Upload</h1>
          <input type="file" accept="image/*" onChange={handleImageChange} className='image' />
          <Button onClick={handleImageUpload} variant='contained' startIcon={<CloudUploadIcon />}>Upload Image</Button>
    
          {predictedClass !== null && (
            <div>
              <h2>Predicted Class:</h2>
              <p>{predictedClass}</p>
            </div>
          )}
        </div>
        </ThemeProvider>
      );
}

export default Upload;