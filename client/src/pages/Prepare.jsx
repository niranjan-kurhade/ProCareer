import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Prepare = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const test = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:3001/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Assuming the server responds with the image name
      const imageName = response.data.fileName;
      // Navigate to '/ChatBot' with the image name passed as a prop
      navigate('/chat', { state: { imageName } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={test} disabled={!selectedFile}>
        Click Here
      </button>
    </div>
  );
};

export default Prepare;
