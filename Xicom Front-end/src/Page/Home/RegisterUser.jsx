import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";

const RegisterUser = () => {
  const [isSameAddress, setIsSameAddress] = useState(false);

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);
  };

  const [documents, setDocuments] = useState([
    { id: Date.now(), fileName: "", fileType: "", file: null },
  ]);

  const handleAddDocument = () => {
    setDocuments([
      ...documents,
      { id: Date.now(), fileName: "", fileType: "", file: null },
    ]);
  };

  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const updatedDocs = documents.map((doc) =>
      doc.id === id ? { ...doc, [field]: value } : doc
    );
    setDocuments(updatedDocs);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto pt-5 text-lg font-extrabold bg-neutral-100 shadow-md rounded-md flex items-center justify-center">
        MERN STACK MACHINE TEST
      </div>
      <form className="max-w-2xl mx-auto p-6 bg-neutral-100 shadow-md rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-semibold mb-1">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name here.."
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold mb-1">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name here.."
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">
              E-mail<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="ex: myname@example.com"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="font-semibold mb-1">
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="dob"
              className="border border-gray-300 p-2 rounded-md"
            />
            <small className="text-gray-500">Min. age should be 18 years</small>
          </div>
        </div>

        {/* Residential Address */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Residential Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="street1"
                className="block text-sm font-medium text-gray-700"
              >
                Street 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="street1"
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label
                htmlFor="street2"
                className="block text-sm font-medium text-gray-700"
              >
                Street 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="street2"
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
          </div>
        </div>

        {/* Same as Residential Address Checkbox */}
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="sameAddress"
            checked={isSameAddress}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="sameAddress">Same as Residential Address</label>
        </div>

        {/* Permanent Address */}
        {!isSameAddress && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Permanent Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="street1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street1"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="street2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street 2 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street2"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>
        )}

        <h3 className="font-semibold mb-4 mt-6">Upload Documents</h3>

        {documents.map((doc, index) => (
          <div
            key={doc.id}
            className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:gap-5 items-center"
          >
            {/* File Name */}
            <div className="flex flex-col w-full sm:w-[30%]">
              <label
                htmlFor={`fileName-${doc.id}`}
                className="font-semibold mb-1"
              >
                File Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id={`fileName-${doc.id}`}
                value={doc.fileName}
                onChange={(e) =>
                  handleInputChange(doc.id, "fileName", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md"
                placeholder="Enter file name"
              />
            </div>

            {/* Type of File */}
            <div className="flex flex-col w-full sm:w-[30%] mt-4 ">
              <label
                htmlFor={`fileType-${doc.id}`}
                className="font-semibold mb-1"
              >
                Type of File<span className="text-red-600">*</span>
              </label>
              <select
                id={`fileType-${doc.id}`}
                value={doc.fileType}
                onChange={(e) =>
                  handleInputChange(doc.id, "fileType", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="">Select type</option>
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
              </select>
              <small className="text-gray-500">(image, pdf.)</small>
            </div>

            {/* Upload Document */}
            <div className="flex flex-col w-full sm:w-[30%] mt-4 sm:mt-0">
              <label htmlFor={`file-${doc.id}`} className="font-semibold mb-1">
                Upload Document<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id={`file-${doc.id}`}
                  onChange={(e) =>
                    handleInputChange(doc.id, "file", e.target.files[0])
                  }
                  className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                />
                <div className="border border-gray-300 p-3 rounded-md w-full flex items-center">
                  <LuUpload className="ml-auto text-gray-500" />
                </div>
              </div>
            </div>

            {/* Add/Remove Button */}
            <div className="flex justify-center mt-4">
              {index === documents.length - 1 ? (
                <button
                  type="button"
                  onClick={handleAddDocument}
                  className="bg-gray-200 p-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="bg-red-200 p-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center mt-6">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg w-32 h-10"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterUser;
