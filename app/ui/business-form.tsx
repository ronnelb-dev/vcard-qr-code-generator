"use client";
import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { TrashIcon } from "@heroicons/react/24/solid";

// Define the type for phone numbers
interface PHONENUMBER {
  number: string;
  type: string;
}

interface EMAIL {
  email: string;
  type: string;
}

interface URL {
  url: string;
  type: string;
}

interface ADDRESS {
  address: string;
  type: string;
}

export default function BusinessForm() {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
  });

  // Default phone types
  const defaultPhoneTypes = ["HOME", "WORK", "CELL"];

  // Default email types
  const defaultEmailTypes = ["HOME", "WORK", "OTHER"];

  // Default url types
  const defaultURLTypes = ["HOME", "WORK", "OTHER"];

  // Default address types
  const defaultAddressTypes = ["HOME", "WORK", "OTHER"];

  // Explicitly define the state type for phone numbers
  const [phoneNumbers, setPhoneNumbers] = useState<PHONENUMBER[]>([
    { number: "", type: "HOME" },
  ]);

  // Explicitly define the state type for phone numbers
  const [emailAddress, setEmail] = useState<EMAIL[]>([
    { email: "", type: "HOME" },
  ]);

  // Explicitly define the state type for phone numbers
  const [url, setURL] = useState<URL[]>([{ url: "", type: "HOME" }]);

  // Explicitly define the state type for phone numbers
  const [address, setAddress] = useState<ADDRESS[]>([
    { address: "", type: "HOME" },
  ]);

  const [customPhoneTypes, setCustomPhoneTypes] = useState<string[]>([]);
  const [isPhoneTypeModalOpen, setIsPhoneTypeModalOpen] = useState(false);
  const [newCustomPhoneType, setNewCustomPhoneType] = useState("");
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<number | null>(
    null
  );

  const [customEmailTypes, setCustomEmailTypes] = useState<string[]>([]);
  const [isEmailTypeModalOpen, setIsEmailTypeModalOpen] = useState(false);
  const [newCustomEmailType, setNewCustomEmailType] = useState("");
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number | null>(
    null
  );

  const [customURLTypes, setCustomURLTypes] = useState<string[]>([]);
  const [isURLTypeModalOpen, setIsURLTypeModalOpen] = useState(false);
  const [newCustomURLType, setNewCustomURLType] = useState("");
  const [selectedURLIndex, setSelectedURLIndex] = useState<number | null>(null);

  const [customAddressTypes, setCustomAddressTypes] = useState<string[]>([]);
  const [isAddressTypeModalOpen, setIsAddressTypeModalOpen] = useState(false);
  const [newCustomAddressType, setNewCustomAddressType] = useState("");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);

  const [qrValue, setQrValue] = useState("");

  // Function to generate vCard data
  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nN:${contact.lastName};${
      contact.firstName
    }\nFN:${contact.firstName} ${contact.lastName}\nORG:${contact.company}
    \nTITLE:${contact.jobTitle}
    \n${phoneNumbers
      .map((phone) => "TEL;TYPE=" + phone.type + ":" + phone.number)
      .join("\n")}
    \n${emailAddress
      .map((email) => `EMAIL;TYPE=${email.type}:${email.email}`)
      .join("\n")}
    \n${url.map((url) => `URL;TYPE=${url.type}:${url.url}`).join("\n")}
    \n${address
      .map((address) => `ADR;TYPE=${address.type}:${address.address}`)
      .join("\n")}
    \nEND:VCARD`;

    setQrValue(vCardData);
  };

  // Function to add another phone number field
  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { number: "", type: "HOME" }]);
  };

  // Function to add another email field
  const addEmail = () => {
    setEmail([...emailAddress, { email: "", type: "HOME" }]);
  };

  // Function to add another url field
  const addURL = () => {
    setURL([...url, { url: "", type: "HOME" }]);
  };

  // Function to add another address field
  const addAddress = () => {
    setAddress([...address, { address: "", type: "HOME" }]);
  };

  // Function to reset form
  const resetForm = () => {
    setContact({
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
    });

    setPhoneNumbers([{ number: "", type: "HOME" }]);
    setEmail([{ email: "", type: "HOME" }]);
    setURL([{ url: "", type: "HOME" }]);
    setAddress([{ address: "", type: "HOME" }]);

    setQrValue(""); // Clear the QR code value
  };
  // Function to update phone number at a specific index
  const updatePhoneNumber = (index: number, value: string) => {
    const updatedNumbers = [...phoneNumbers];
    updatedNumbers[index].number = value;
    setPhoneNumbers(updatedNumbers);
  };

  // Function to update phone type at a specific index
  const updatePhoneType = (index: number, value: string) => {
    if (value === "Custom") {
      setSelectedPhoneIndex(index);
      setIsPhoneTypeModalOpen(true);
    } else {
      const updatedNumbers = [...phoneNumbers];
      updatedNumbers[index].type = value;
      setPhoneNumbers(updatedNumbers);
    }
  };

  // Function to save custom phone type
  const saveCustomPhoneType = () => {
    if (newCustomPhoneType.trim() === "") return;

    setCustomPhoneTypes((prev) => [...prev, newCustomPhoneType]);

    if (selectedPhoneIndex !== null) {
      const updatedNumbers = [...phoneNumbers];
      updatedNumbers[selectedPhoneIndex].type = newCustomPhoneType;
      setPhoneNumbers(updatedNumbers);
    }

    setNewCustomPhoneType("");
    setSelectedPhoneIndex(null);
    setIsPhoneTypeModalOpen(false);
  };

  // Function to remove a phone number field
  const removePhoneNumber = (index: number) => {
    const updatedNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedNumbers);
  };

  // Phone number validation function
  // const validatePhoneNumber = (number: string) => {
  //   const phoneRegex = /^[0-9]{10,15}$/; // Accepts 10-15 digits
  //   return phoneRegex.test(number);
  // };

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    return emailRegex.test(email);
  };

  // URL validation function (Regex-based)
  const validateURL = (url: string) => {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/;
    return urlRegex.test(url);
  };

  const downloadQRCode = () => {
    if (qrRef.current instanceof HTMLDivElement) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas instanceof HTMLCanvasElement) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "vcard_qr_code.png";
        link.click();
      }
    }
  };

  // Function to update email at a specific index
  const updateEmail = (index: number, value: string) => {
    const updatedEmail = [...emailAddress];
    updatedEmail[index].email = value;
    setEmail(updatedEmail);
  };

  // Function to update phone type at a specific index
  const updateEmailType = (index: number, value: string) => {
    if (value === "Custom") {
      setSelectedEmailIndex(index);
      setIsEmailTypeModalOpen(true);
    } else {
      const updatedEmail = [...emailAddress];
      updatedEmail[index].type = value;
      setEmail(updatedEmail);
    }
  };

  // Function to save custom email type
  const saveCustomEmailType = () => {
    if (newCustomEmailType.trim() === "") return;

    setCustomEmailTypes((prev) => [...prev, newCustomEmailType]);

    if (selectedEmailIndex !== null) {
      const updatedEmail = [...emailAddress];
      updatedEmail[selectedEmailIndex].type = newCustomEmailType;
      setEmail(updatedEmail);
    }

    setNewCustomEmailType("");
    setSelectedEmailIndex(null);
    setIsEmailTypeModalOpen(false);
  };

  // Function to remove a email field
  const removeEmail = (index: number) => {
    const updatedEmail = emailAddress.filter((_, i) => i !== index);
    setEmail(updatedEmail);
  };

  // Function to update url at a specific index
  const updateURL = (index: number, value: string) => {
    const updatedUrl = [...url];
    updatedUrl[index].url = value;
    setURL(updatedUrl);
  };

  // Function to update url type at a specific index
  const updateURLType = (index: number, value: string) => {
    if (value === "Custom") {
      setSelectedURLIndex(index);
      setIsURLTypeModalOpen(true);
    } else {
      const updatedURL = [...url];
      updatedURL[index].type = value;
      setURL(updatedURL);
    }
  };

  // Function to save custom url type
  const saveCustomURLType = () => {
    if (newCustomURLType.trim() === "") return;

    setCustomURLTypes((prev) => [...prev, newCustomURLType]);

    if (selectedURLIndex !== null) {
      const updatedUrl = [...url];
      updatedUrl[selectedURLIndex].type = newCustomURLType;
      setURL(updatedUrl);
    }

    setNewCustomURLType("");
    setSelectedURLIndex(null);
    setIsURLTypeModalOpen(false);
  };

  // Function to remove a url field
  const removeURL = (index: number) => {
    const updatedUrl = url.filter((_, i) => i !== index);
    setURL(updatedUrl);
  };

  // Function to update Address at a specific index
  const updateAddress = (index: number, value: string) => {
    const updatedAddress = [...address];
    updatedAddress[index].address = value;
    setAddress(updatedAddress);
  };

  // Function to update address type at a specific index
  const updateAddressType = (index: number, value: string) => {
    if (value === "Custom") {
      setSelectedAddressIndex(index);
      setIsAddressTypeModalOpen(true);
    } else {
      const updatedAddress = [...address];
      updatedAddress[index].type = value;
      setAddress(updatedAddress);
    }
  };

  // Function to save custom Address type
  const saveCustomAddressType = () => {
    if (newCustomAddressType.trim() === "") return;

    setCustomAddressTypes((prev) => [...prev, newCustomAddressType]);

    if (selectedAddressIndex !== null) {
      const updatedAddress = [...address];
      updatedAddress[selectedAddressIndex].type = newCustomAddressType;
      setAddress(updatedAddress);
    }

    setNewCustomAddressType("");
    setSelectedAddressIndex(null);
    setIsAddressTypeModalOpen(false);
  };

  // Function to remove a Address field
  const removeAddress = (index: number) => {
    const updatedAddress = address.filter((_, i) => i !== index);
    setAddress(updatedAddress);
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 text-center">
          <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
            vCard QR Code Generator
          </h2>
        </div>

        <div className="border-b border-gray-900/10">
          <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
            Information Form
          </h2>
          {/* <p className="mt-1 text-sm/6 text-gray-600">
            This information will be used to generate a QR code, so share it
            carefully.
          </p> */}

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  value={contact.firstName} // Added value attribute
                  onChange={(e) =>
                    setContact({ ...contact, firstName: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={contact.lastName} // Added value attribute
                  autoComplete="family-name"
                  onChange={(e) =>
                    setContact({ ...contact, lastName: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Company
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={contact.company} // Added value attribute
                  autoComplete="given-name"
                  onChange={(e) =>
                    setContact({ ...contact, company: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Job Title
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  value={contact.jobTitle} // Added value attribute
                  autoComplete="family-name"
                  onChange={(e) =>
                    setContact({ ...contact, jobTitle: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Phone Numbers Section */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Phone Numbers
              </label>

              {phoneNumbers.map((phone, index) => (
                <div key={index} className="mt-2 flex gap-2 items-center">
                  {/* Phone Number Input */}
                  <input
                    type="text"
                    value={phone.number}
                    onChange={(e) => updatePhoneNumber(index, e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder={`Phone Number ${index + 1}`}
                  />

                  {/* Phone Type Dropdown */}
                  <select
                    value={phone.type}
                    onChange={(e) => updatePhoneType(index, e.target.value)}
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {[...defaultPhoneTypes, ...customPhoneTypes].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>

                  {/* Remove Button */}
                  {phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhoneNumber(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {/* Add More Button */}
              <button
                type="button"
                onClick={addPhoneNumber}
                className="mt-3 text-blue-600 hover:underline"
              >
                + Add More
              </button>
            </div>

            {/* Email Section */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Email address
              </label>

              {emailAddress.map((email, index) => (
                <div key={index} className="mt-2 flex gap-2 items-center">
                  {/* Phone Number Input */}
                  <input
                    type="text"
                    value={email.email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder={`Phone Number ${index + 1}`}
                  />

                  {/* Email Type Dropdown */}
                  <select
                    value={email.type}
                    onChange={(e) => updateEmailType(index, e.target.value)}
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {[...defaultEmailTypes, ...customEmailTypes].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>

                  {/* Remove Button */}
                  {emailAddress.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {/* Email Address Validation Message */}
              {emailAddress.some((email) => !validateEmail(email.email)) && (
                <p className="text-teal-600 text-sm mt-1">
                  Please enter a valid email address.
                </p>
              )}

              {/* Add More Button */}
              <button
                type="button"
                onClick={addEmail}
                className="mt-3 text-blue-600 hover:underline"
              >
                + Add More
              </button>
            </div>

            {/* URL Section */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                URL
              </label>

              {url.map((thisURL, index) => (
                <div key={index} className="mt-2 flex gap-2 items-center">
                  {/* URL Input */}
                  <input
                    type="text"
                    value={thisURL.url}
                    onChange={(e) => updateURL(index, e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder={`URL ${index + 1}`}
                  />

                  {/* URL Type Dropdown */}
                  <select
                    value={thisURL.type}
                    onChange={(e) => updateURLType(index, e.target.value)}
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {[...defaultURLTypes, ...customURLTypes].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>

                  {/* Remove Button */}
                  {url.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeURL(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {/* URL Validation Message */}
              {url.some((thisURL) => !validateURL(thisURL.url)) && (
                <p className="text-teal-600 text-sm mt-1">
                  Please enter a valid URL.
                </p>
              )}

              {/* Add More Button */}
              <button
                type="button"
                onClick={addURL}
                className="mt-3 text-blue-600 hover:underline"
              >
                + Add More
              </button>
            </div>

            {/* Address Section */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>

              {address.map((thisAddress, index) => (
                <div key={index} className="mt-2 flex gap-2 items-center">
                  {/* Address Input */}
                  <input
                    type="text"
                    value={thisAddress.address}
                    onChange={(e) => updateAddress(index, e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder={`Address ${index + 1}`}
                  />

                  {/* Address Type Dropdown */}
                  <select
                    value={thisAddress.type}
                    onChange={(e) => updateAddressType(index, e.target.value)}
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {[...defaultAddressTypes, ...customAddressTypes].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                    <option value="Custom">Custom</option>
                  </select>

                  {/* Remove Button */}
                  {address.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {/* Add More Button */}
              <button
                type="button"
                onClick={addAddress}
                className="mt-3 text-blue-600 hover:underline"
              >
                + Add More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          onClick={generateVCard}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          GENERATE QR CODE
        </button>
      </div>

      {qrValue && (
        <div ref={qrRef} className="p-4 border rounded-md shadow-md mt-6">
          <QRCodeCanvas value={qrValue} size={420} />
        </div>
      )}

      {qrValue && (
        <div className="flex-row">
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            {/* Reset Form Button */}
            <button
              type="button"
              onClick={resetForm}
              className="mt-3 text-blue-600 hover:underline"
            >
              Reset Form
            </button>
          </div>
        </div>
      )}

      {/* Custom Phone Type Modal */}
      {isPhoneTypeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Enter Custom Phone Type
            </h2>
            <input
              type="text"
              value={newCustomPhoneType}
              onChange={(e) => setNewCustomPhoneType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter custom type"
            />
            <p className="text-gray-400 text-sm mt-1">
              Note: Some types are not available in android
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPhoneTypeModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomPhoneType}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Email Type Modal */}
      {isEmailTypeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Enter Custom Email Type
            </h2>
            <input
              type="text"
              value={newCustomEmailType}
              onChange={(e) => setNewCustomEmailType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter custom type"
            />
            <p className="text-gray-400 text-sm mt-1">
              Note: Some types are not available in android
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEmailTypeModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomEmailType}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Address Type Modal */}
      {isAddressTypeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Enter Custom Address Type
            </h2>
            <input
              type="text"
              value={newCustomAddressType}
              onChange={(e) => setNewCustomAddressType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter custom type"
            />
            <p className="text-gray-400 text-sm mt-1">
              Note: Some types are not available in android
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsAddressTypeModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomAddressType}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom URL Type Modal */}
      {isURLTypeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Enter Custom URL Type
            </h2>
            <input
              type="text"
              value={newCustomURLType}
              onChange={(e) => setNewCustomURLType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter custom type"
            />
            <p className="text-gray-400 text-sm mt-1">
              Note: Some types are not available in android
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsURLTypeModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomURLType}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
