import axiosInstance from '@/api/axiosInstance';
import { removeCustomerAddress, selectCurrentAddress, selectCustomer, setCurrentActiveAddress } from '@/redux/user';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
const AddressCard = () => {
    const customer = useSelector(selectCustomer)
    const currentAddress = useSelector(selectCurrentAddress)
    const dispatch = useDispatch();
    const handleSelect = (address) => {
        dispatch(setCurrentActiveAddress(address))
    };

    const handleDelete = async(id) => {
        try{
            const {data} = await axiosInstance.delete(`/delete-address/${id}`)
            if(data.success){
                toast.success(data.message)
                dispatch(removeCustomerAddress(id))
            }
        }
        catch(err){
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className="space-y-4 bg-white my-4 p-4 rounded-md">
            {customer?.addresses.map((address, index) => (
                <div
                    key={index}
                    className={`flex justify-between items-center p-4 border rounded-lg shadow-md cursor-pointer ${currentAddress === address ? 'border-orange-500' : ''
                        }`}
                    onClick={() => handleSelect(address)}
                >
                    <div className="flex items-center space-x-4">
                        <div
                            className={`w-5 h-5 flex justify-center items-center rounded-full border-2 ${currentAddress === address ? 'bg-orange-600 border-orange-600' : ''
                                }`}
                        >
                            {currentAddress === address && <FaCheck className="text-white" size={12} />}
                        </div>
                        <div>
                            <p className="font-medium">{address.addressLine1}</p>
                            {address.addressLine2 && <p className="text-sm text-gray-600">{address.addressLine2}</p>}
                            <p className="text-sm text-gray-600">{address.city}, {address.state}, {address.zipCode}</p>
                            <p className="text-sm text-gray-600">{address.country}</p>
                        </div>
                    </div>
                    <div onClick={()=>handleDelete(address._id)}>
                        <MdDelete size={24} style={{color: "#cc0000"}} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddressCard;
