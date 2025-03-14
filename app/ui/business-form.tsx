"use client";
import React, { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { QRCodeCanvas } from "qrcode.react";
import { TrashIcon } from "@heroicons/react/24/solid";

// Define the type for phone numbers
interface PhoneNumber {
  number: string;
  type: string;
}

export default function BusinessForm() {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    jobTitle: "",
    url: "",
    address: "",
  });

  // Default phone types
  const defaultPhoneTypes = ["Mobile", "Work", "Home"];

  // Explicitly define the state type for phone numbers
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    { number: "", type: "Mobile" },
  ]);

  const [customPhoneTypes, setCustomPhoneTypes] = useState<string[]>([]);
  const [isPhoneTypeModalOpen, setIsPhoneTypeModalOpen] = useState(false);
  const [newCustomType, setNewCustomType] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [qrValue, setQrValue] = useState("");

  // Function to generate vCard data
  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nN:${contact.lastName};${
      contact.firstName
    }\nFN:${contact.firstName} ${contact.lastName}\nORG:${
      contact.company
    }\nTITLE:${contact.jobTitle}\nEMAIL:${contact.email}\nURL:${
      contact.url
    }\nADR;TYPE=WORK:;;${contact.address}\n${phoneNumbers
      .map((phone) => `TEL;TYPE=${phone.type}:${phone.number}`)
      .join("\n")}\nEND:VCARD`;

    setQrValue(vCardData);
  };

  // Function to add another phone number field
  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { number: "", type: "Mobile" }]);
  };

  // Function to add another phone number field
  const resetForm = () => {
    setQrValue("");
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
      setSelectedIndex(index);
      setIsPhoneTypeModalOpen(true);
    } else {
      const updatedNumbers = [...phoneNumbers];
      updatedNumbers[index].type = value;
      setPhoneNumbers(updatedNumbers);
    }
  };

  // Function to save custom phone type
  const saveCustomPhoneType = () => {
    if (newCustomType.trim() === "") return;

    setCustomPhoneTypes((prev) => [...prev, newCustomType]);

    if (selectedIndex !== null) {
      const updatedNumbers = [...phoneNumbers];
      updatedNumbers[selectedIndex].type = newCustomType;
      setPhoneNumbers(updatedNumbers);
    }

    setNewCustomType("");
    setSelectedIndex(null);
    setIsPhoneTypeModalOpen(false);
  };

  // Function to remove a phone number field
  const removePhoneNumber = (index: number) => {
    const updatedNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedNumbers);
  };

  // Phone number validation function
  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10,15}$/; // Accepts 10-15 digits
    return phoneRegex.test(number);
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

              {/* Phone Number Validation Message */}
              {phoneNumbers.some(
                (phone) => !validatePhoneNumber(phone.number)
              ) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid phone number (10-15 digits).
                </p>
              )}

              {/* Add More Button */}
              <button
                type="button"
                onClick={addPhoneNumber}
                className="mt-3 text-blue-600 hover:underline"
              >
                + Add More
              </button>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                URL/Website
              </label>
              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="url"
                  onChange={(e) =>
                    setContact({ ...contact, url: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
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
              onClick={downloadQRCode}>
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
              value={newCustomType}
              onChange={(e) => setNewCustomType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter custom type"
            />
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
    </div>
  );
}
