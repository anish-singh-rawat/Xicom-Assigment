import React, { useState } from 'react';
const DocumentUpload = ({ documents, onDocumentChange }) => {
  const [newDocument, setNewDocument] = useState({ fileName: '', fileType: '', file: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument({
      ...newDocument,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNewDocument({
      ...newDocument,
      file: e.target.files[0],
    });
  };

  const handleAddDocument = () => {
    if (newDocument.fileName && newDocument.fileType && newDocument.file) {
      onDocumentChange([...documents, newDocument]);
      setNewDocument({ fileName: '', fileType: '', file: null });
    }
  };

  return (
    <div>
      <h3>Upload Documents</h3>
      <input type="text" name="fileName" placeholder="File Name" value={newDocument.fileName} onChange={handleInputChange} />
      <input type="text" name="fileType" placeholder="File Type" value={newDocument.fileType} onChange={handleInputChange} />
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleAddDocument}>Add Document</button>

      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            {doc.fileName} ({doc.fileType})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentUpload;
