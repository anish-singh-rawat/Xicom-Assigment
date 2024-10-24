import React, { useState } from 'react';

const RegisterUser = () => {
  const [isSameAddress, setIsSameAddress] = useState(false);

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);
  };

  return (
    <form className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
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
        <input
          type="text"
          placeholder="Street 1*"
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Street 2*"
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
    </div>

    {/* Same as Residential Address Checkbox */}
    <div className="flex items-center mt-4">
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
          <input
            type="text"
            placeholder="Street 1*"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Street 2*"
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
    )}
  </form>
  );
}

export default RegisterUser;
