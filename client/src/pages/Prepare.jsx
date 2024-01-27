import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section'; // Import Section component
import styles from '../styles/Prepare.module.css'; // Import the CSS module file
import Navbar from '../components/Navbar';

const Prepare = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // Track the active section
  const navigate = useNavigate();

  const handleFileChange = (event, sectionId) => {
    setSelectedFile(event.target.files[0]);
    setActiveSection(sectionId); // Set the active section
  };

  const uploadFile = async (sectionId) => {
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
      <Navbar />

      <Section
        title="Resume"
        description="Test your skills based on your Resume"
        selectedFile={selectedFile}
        handleFileChange={(e) => handleFileChange(e, 1)} // Pass sectionId
        uploadFile={() => uploadFile(1)} // Pass sectionId
        isActive={activeSection === 1} // Check if this section is active
      />
      <Section
        title="Job Description"
        description="Test yourself based on the Job Description"
        selectedFile={selectedFile}
        handleFileChange={(e) => handleFileChange(e, 2)} // Pass sectionId
        uploadFile={() => uploadFile(2)} // Pass sectionId
        isActive={activeSection === 2} // Check if this section is active
      />
      <Section
        title="Technical Skills"
        description="Test yourself based on the technical skills  "
        selectedFile={selectedFile}
        handleFileChange={(e) => handleFileChange(e, 3)} // Pass sectionId
        uploadFile={() => uploadFile(3)} // Pass sectionId
        isActive={activeSection === 3} // Check if this section is active
      />
      <Section
        title="Basics"
        description="Test yourself  based on the fundamentals"
        selectedFile={selectedFile}
        handleFileChange={(e) => handleFileChange(e, 4)} // Pass sectionId
        uploadFile={() => uploadFile(4)} // Pass sectionId
        isActive={activeSection === 4} // Check if this section is active
      />
    </div>
  );
};

export default Prepare;