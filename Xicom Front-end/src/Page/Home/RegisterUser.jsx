import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { registerSchema } from "../../validations";
import axiosInstance from "../../../utils/axios";

const RegisterUser = () => {
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: null,
    residentialAddress: {
      street1: "",
      street2: "",
    },
    permanentAddress: {
      street1: "",
      street2: "",
    },
    documents: [{ id: Date.now(), fileName: "", fileType: "", file: null }],
  });

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);
    if (isSameAddress === true) {
      formData.permanentAddress = {
        street1: "",
        street2: "",
      };
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddressChange = (e, type, field) => {
    setFormData({
      ...formData,
      [type]: {
        ...formData[type],
        [field]: e.target.value,
      },
    });
  };

  const handleDocumentChange = (id, field, value) => {
    const updatedDocs = formData.documents.map((doc) =>
      doc.id === id ? { ...doc, [field]: value } : doc
    );
    setFormData({ ...formData, documents: updatedDocs });
  };

  const handleAddDocument = () => {
    setFormData({
      ...formData,
      documents: [
        ...formData.documents,
        { id: Date.now(), fileName: "", fileType: "", file: null },
      ],
    });
  };

  const handleRemoveDocument = (id) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((doc) => doc.id !== id),
    });
  };

  const handleSubmit = async () => {
    if (isSameAddress === true) {
      formData.permanentAddress = {
        street1: formData.residentialAddress.street1,
        street2: formData.residentialAddress.street2,
      };
    }
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      let payload = {
        firstName : formData.firstName,
        lastName : formData.lastName,
        dob : formData.dob,
        email : formData.email,
        residentialAddress : {
          street1 : formData.residentialAddress.street1,
          street2 : formData.residentialAddress.street2,
        },
        permanentAddress : {
          street1 : formData.permanentAddress.street1,
          street2 : formData.permanentAddress.street2,
        },
        documents: formData.documents.map((document) => ({
          fileName: document.fileName,
          fileType: document.fileType,
          file: document.file,
        })),
        isSameAsResidential : isSameAddress,
      };
      const response = await axiosInstance.post("/auth/register",payload)
      console.log("Validation Successful", response);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      console.error("Validation Errors", err.errors);
    }
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
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name here.."
              className="border border-gray-300 p-2 rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold mb-1">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name here.."
              className="border border-gray-300 p-2 rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">
              E-mail<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ex: myname@example.com"
              className="border border-gray-300 p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="font-semibold mb-1">
              Date of Birth<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md"
            />
            <small className="text-gray-500">Min. age should be 18 years</small>
            {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
          </div>
        </div>

        {/* Residential Address */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Residential Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="resStreet1"
                className="block text-sm font-medium text-gray-700"
              >
                Street 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="resStreet1"
                value={formData.residentialAddress.street1}
                onChange={(e) =>
                  handleAddressChange(e, "residentialAddress", "street1")
                }
                className="border border-gray-300 p-2 rounded-md w-full"
              />

              {errors["residentialAddress.street1"] && (
                <p className="text-red-600 text-sm">
                  {errors["residentialAddress.street1"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="resStreet2"
                className="block text-sm font-medium text-gray-700"
              >
                Street 2 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="resStreet2"
                value={formData.residentialAddress.street2}
                onChange={(e) =>
                  handleAddressChange(e, "residentialAddress", "street2")
                }
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              {errors["residentialAddress.street2"] && (
                <p className="text-red-600 text-sm">
                  {errors["residentialAddress.street2"]}
                </p>
              )}
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
                  htmlFor="permStreet1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="permStreet1"
                  value={formData.permanentAddress.street1}
                  onChange={(e) =>
                    handleAddressChange(e, "permanentAddress", "street1")
                  }
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                {errors["permanentAddress.street1"] && (
                  <p className="text-red-600 text-sm">
                    {errors["permanentAddress.street1"]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="permStreet2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street 2 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="permStreet2"
                  value={formData.permanentAddress.street2}
                  onChange={(e) =>
                    handleAddressChange(e, "permanentAddress", "street2")
                  }
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                {errors["permanentAddress.street2"] && (
                  <p className="text-red-600 text-sm">
                    {errors["permanentAddress.street2"]}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <h3 className="font-semibold mb-4 mt-6">Upload Documents</h3>

        {formData.documents.map((doc, index) => (
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
                  handleDocumentChange(doc.id, "fileName", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md"
                placeholder="Enter file name"
              />
              {errors[`documents[${index}].fileName`] && (
                <p className="text-red-600 text-sm">
                  {errors[`documents[${index}].fileName`]}
                </p>
              )}
              {console.log(errors)}
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
                  handleDocumentChange(doc.id, "fileType", e.target.value)
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="">Select type</option>
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
              </select>
              <small className="text-gray-500">(image, pdf.)</small>
              {errors[`documents[${index}].fileType`] && (
                <p className="text-red-600 text-sm">
                  {errors[`documents[${index}].fileType`]}
                </p>
              )}
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
                    handleDocumentChange(doc.id, "file", e.target.files[0])
                  }
                  className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                />
                <div className="border border-gray-300 gap-3 p-3 rounded-md w-full flex items-center">
                  <LuUpload className="ml-auto text-gray-500 h-4 w-4" />
                  <div className="truncate">
                    {formData?.documents[0]?.file?.name &&
                      formData?.documents[0]?.file?.name
                        .split(" ")
                        .slice(0, 4)
                        .join(" ") +
                        (formData?.documents[0]?.file?.name?.split(" ")?.length > 5
                          ? "..."
                          : "")}
                  </div>
                </div>
                {errors[`documents[${index}].file`] && (
                  <p className="text-red-600 text-sm">
                    {errors[`documents[${index}].file`]}
                  </p>
                )}
              </div>
            </div>

            {/* Add/Remove Button */}
            <div className="flex justify-center mt-4">
              {index === formData.documents.length - 1 ? (
                <button
                  type="button"
                  onClick={handleAddDocument}
                  className="bg-gray-200 p-2 rounded-md"
                >
                  <IoMdAdd />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(doc.id)}
                  className="bg-red-200 p-2 rounded-md"
                >
                  <CiCircleRemove />
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center mt-6">
          <button
            type="button"
            onClick={handleSubmit}
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
