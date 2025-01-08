// src/components/AddAddressAccordion.jsx
import axiosInstance from '@/api/axiosInstance';
import { addCustomerAddress, selectCustomer, setCurrentActiveAddress } from '@/redux/user';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LocationPicker from './LocationPicker';

const AddressForm = ({ address, handleChange, handleClick }) => {
  return (
    <div
      id="address-form"
      className="p-4 border-t transition-all duration-300 ease-in-out"
    >
      <form onSubmit={handleClick} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Address Line1
          </label>
          <input
            type="text"
            id="fullName"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
            Address Line2
          </label>
          <input
            type="text"
            id="streetAddress"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        <div className="text-right">
          <button
            // onClick={handleClick}
            type='submit'
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  )
}


const AddAddressAccordion = () => {
  const customer = useSelector(selectCustomer)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    latitude: 0,
    longitude: 0,
  });

  const [showForm, setShowForm] = useState(false);

  const toggleAccordion = () => {
    if (!customer) {
      toast.error("Please login first!!")
      navigate("/login");
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleCords = (latitude, longitude) => {
    // console.log("tushar", latitude, longitude);
    setAddress({ ...address, latitude, longitude });
  }

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!customer) {
      toast.error("Please login first!!")
      navigate("/login");
      return;
    }
    try {
      const { data } = await axiosInstance.post('/add-address', { ...address }, {
        withCredentials: true
      })
      if (data.success) {
        dispatch(setCurrentActiveAddress(address))
        dispatch(addCustomerAddress(address))
        setAddress({
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          latitude: 0,
          longitude: 0,
        });
        setIsOpen(false);
        toast.success(data.message)
      }
    }
    catch (err) {
      console.error(err.message);
    }
  };


  // const handleClick = () => {
  //   handleSubmit();
  // }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Accordion Header */}
      <button
        className="w-full flex justify-between items-center p-4 text-left text-gray-700 focus:outline-none"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls="address-form"
      >
        <span className="text-lg font-medium">Add Delivery Address</span>
        {isOpen ? <IoMdRemove /> : <IoMdAdd />}
      </button>

      {isOpen && (
        !showForm ? (
          <>
            <LocationPicker onChangeCords={handleCords} />
            <div className='flex justify-end'>
              <button
                className='bg-orange-500 py-2 px-4 rounded-md text-white m-2'
                onClick={() => setShowForm(true)}
              >
                Confirm Location
              </button>
            </div>
          </>
        ) : (
          <AddressForm address={address} handleChange={handleChange} handleClick={handleClick} />
        )
      )}
    </div>
  );
};

export default AddAddressAccordion;
