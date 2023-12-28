import { React, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";
import './login.css'
import Header from "./header";
import { ResetTv } from "@mui/icons-material";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Login() {
    const [log, setLog] = useState(false);
    const [name, setName] = useState(''); // State for the input

    const [image, setImage] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);
    const [stringf, setStringf] = useState('');
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    const string_to_add = (e) => {
        if (e === 0) {
            setStringf('Glioma Tumor');
        }
        else if (e === 2) {
            setStringf("No Tumor");
        }
        else if (e === 1) {
            setStringf("Meningioma Tumor");
        }
        else {
            setStringf('Pituitary Tumor');
        }
    }
    const handleImageUpload = async () => {
        setPredictedClass(null);
        if (!image) {
            alert('Please select an image');
            return;
        }

        try {

            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post('http://localhost:4000/upload', formData);
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                string_to_add(response.data.predicted_class);
                setPredictedClass(response.data.predicted_class);
            } else {
                console.error('Error uploading image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    const handleClick = () => {
        setLog(true);
    };
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div>
                {log ? (
                    <div>
                        <Header name={name} />
                        <div className="upload_outt">
                            <div className="upload_cont">
                                <h1>Upload MRI Images</h1>
                                <input type="file" accept="image/*" onChange={handleImageChange} className='image' />
                                <Button onClick={handleImageUpload} variant='contained' startIcon={<CloudUploadIcon />} className="upload_butt">Upload Image</Button>
                            </div>
                            {predictedClass !== null && (
                                <div className="img_cont">
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="up_image" />
                                    <div className="img_inner">
                                        <h2>Predicted Result :</h2>
                                        <p>{stringf}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                ) : (
                    <div className="login_container">
                        <h2>BRAIN TUMOR DETECTION & CLASSIFICATION</h2>
                        <input type="text" className="name_in" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} ></input>
                        <Button variant="contained" onClick={handleClick}>
                            Go
                        </Button>
                    </div>
                )}
            </div>
        </ThemeProvider>

    );
}

export default Login;
