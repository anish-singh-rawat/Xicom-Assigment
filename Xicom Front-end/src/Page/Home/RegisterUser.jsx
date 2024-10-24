import React, { useState } from 'react';
import axios from 'axios';
import DocumentUpload from '../../Components/DocumentUpload';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    residentialAddress: '',
    permanentAddress: '',
    sameAsResidential: false,
    documents: []
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDocumentChange = (newDocuments) => {
    setFormData({ ...formData, documents: newDocuments });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';

    if (!formData.documents || formData.documents.length < 2) {
      newErrors.documents = 'At least two documents are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/submit', formData);
        console.log(response.data);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        {errors.fullName && <p>{errors.fullName}</p>}
      </div>

      <div>
        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
      </div>

      <div>
        <label>Residential Address</label>
        <input type="text" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="sameAsResidential"
            checked={formData.sameAsResidential}
            onChange={handleChange}
          />
          Same as Residential Address
        </label>
      </div>

      {!formData.sameAsResidential && (
        <div>
          <label>Permanent Address</label>
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
        </div>
      )}

      <DocumentUpload documents={formData.documents} onDocumentChange={handleDocumentChange} />

      {errors.documents && <p>{errors.documents}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterUser;
