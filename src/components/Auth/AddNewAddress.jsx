import React, { useState } from 'react';
import Flag from 'react-world-flags';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import useCreateDeliveryAddress from "@/hooks/api/mutation/addressBook/useCreateDeliveryAddress.js";
import {toast} from "sonner";

const africaRegions = {
  Nigeria: ['Abia', 'Lagos', 'Kano', 'Oyo'],
  Ghana: ['Accra', 'Kumasi'],
  Benin: ['Cotonou', 'Porto-Novo'],
  Togo: ['Lomé', 'Kara'],
  Cameroon: ['Douala', 'Yaoundé'],
  Niger: ['Niamey', 'Maradi'],
  Chad: ["N'Djamena", 'Moundou'],
};

const countries = [
  { code: 'NG', dialCode: '+234', name: 'Nigeria' },
  { code: 'GH', dialCode: '+233', name: 'Ghana' },
  { code: 'KE', dialCode: '+254', name: 'Kenya' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa' },
  { code: 'UG', dialCode: '+256', name: 'Uganda' },
];

export default function AddNewAddress() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalPhone: '',
    address: '',
    region: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setFormData((prev) => ({
      ...prev,
      region,
      city: '', // reset city when region changes
    }));
  };

    const { mutate: createAddress, isPending } = useCreateDeliveryAddress();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone,
            alternatePhoneNumber: formData.additionalPhone,
            delivery: formData.address,
            isDefault: true,
            region: formData.region,
            city: formData.city,
        };
        createAddress(payload, {
            onSuccess: (response) => {
                toast.success(response?.data?.message || "Address book added!");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    additionalPhone: '',
                    address: '',
                    region: '',
                    city: '',
                });
               navigate("/address-book")
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || "Error applying");
                // handle error, e.g., show error message
            },
        });
    };
    return (
    <div
      className="w-[878px] mx-auto ml-10 p-6"
      style={{
        boxShadow:
          '0px 14px 30px 0px #7575751A, 0px 55px 55px 0px #75757517, 0px 124px 74px 0px #7575750D, 0px 220px 88px 0px #75757503, 0px 344px 96px 0px #75757500',
      }}
    >
      <button onClick={() => navigate(-1)} className="mb-[48px] text-base font-medium flex gap-2 ">
          <IoIosArrowBack size={24} />Add New Address
      </button>

      <h2 className="text-2xl font-semibold mb-6"></h2>

      <form className="space-y-5 mx-10 pb-[163px]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-4">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full py-5 pl-6  rounded-xl bg-[#F2F2F7]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
               className="w-full py-5 pl-6  rounded-xl bg-[#F2F2F7]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
           className="w-full py-5 pl-6  rounded-xl bg-[#F2F2F7]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-4">Phone Number</label>
            <div className="flex items-center gap-2">
              <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                <div className="relative w-28">
                  <Listbox.Button className=" w-full flex items-center justify-between py-5 px-6 pr-2 rounded-xl bg-[#F2F2F7]">
                    <div className="flex items-center gap-1 ">
                      <Flag code={selectedCountry.code} style={{ width: 20 }} />
                      <span>{selectedCountry.dialCode}</span>
                    </div>
                    <ChevronDown size={16} />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 bg-white border mt-1 rounded shadow w-full">
                    {countries.map((country) => (
                      <Listbox.Option key={country.code} value={country} className="cursor-pointer p-2 hover:bg-gray-100">
                        <div className="flex items-center gap-2">
                          <Flag code={country.code} style={{ width: 20 }} />
                          <span>
                            {country.name} ({country.dialCode})
                          </span>
                        </div>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="flex-1 p-2  py-5 pl-6  rounded-xl bg-[#F2F2F7]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">Additional Phone Number</label>
            <div className="flex items-center gap-2">
              <span className="rounded-xl  py-5 px-6 bg-gray-100">{selectedCountry.dialCode}</span>
              <input
                type="tel"
                name="additionalPhone"
                value={formData.additionalPhone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="flex-1 p-2  py-5 pl-6  rounded-xl bg-[#F2F2F7]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Delivery Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className="w-full p-2  py-5 pl-6  rounded-xl bg-[#F2F2F7]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleRegionChange}
              className="w-full p-2 py-5 pl-6  rounded-xl bg-[#F2F2F7]"
              required
            >
              <option value="">Select a region</option>
              {Object.keys(africaRegions).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 py-5 pl-6 rounded-xl bg-[#F2F2F7]"
              required
              disabled={!formData.region}
            >
              <option value="">Select a city</option>
              {formData.region &&
                africaRegions[formData.region].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button type="submit" className="w-[300px] bg-[#E94E30] rounded-2xl text-white hover:bg-[#D94326] py-[18px] save-edit-address ">
            {isPending ? "saving" :  "Save" }
        </button>
      </form>
    </div>
  );
}
