import { format } from 'date-fns';
import { CheckCircle, Clock, XCircle, Truck } from 'lucide-react';
import defaultRestaurantImage from "@/assets/default-restaurant-image.jpg";
import { useState } from 'react';
import ItemModal from '../modals/ItemModal';

const statusStyles = {
    Pending: { icon: <Clock className="h-5 w-5 text-yellow-500 mt-1" />, color: 'bg-yellow-200', shadow: 'shadow-[0_4px_6px_rgba(234,179,8,0.6)]' }, // yellow shadow
    Accepted: { icon: <CheckCircle className="h-5 w-5 text-green-500 mt-1" />, color: 'bg-green-200', shadow: 'shadow-[0_4px_6px_rgba(34,197,94,0.5)]' }, // green shadow
    Preparing: { icon: <Clock className="h-5 w-5 text-blue-500 mt-1" />, color: 'bg-blue-200', shadow: 'shadow-[0_4px_6px_rgba(59,130,246,0.6)]' }, // blue shadow
    Ready: { icon: <Truck className="h-5 w-5 text-indigo-500 mt-1" />, color: 'bg-indigo-200', shadow: 'shadow-[0_4px_6px_rgba(99,102,241,0.5)]' }, // indigo shadow
    'Out for Delivery': { icon: <Truck className="h-5 w-5 text-purple-500 mt-1" />, color: 'bg-purple-200', shadow: 'shadow-[0_4px_6px_rgba(139,92,246,0.5)]' }, // purple shadow
    Delivered: { icon: <CheckCircle className="h-5 w-5 text-green-500 mt-1" />, color: 'bg-green-200', shadow: 'shadow-[0_4px_6px_rgba(34,197,94,0.5)]' }, // green shadow
    Cancelled: { icon: <XCircle className="h-5 w-5 text-red-500 mt-1" />, color: 'bg-red-100', shadow: 'shadow-[0_4px_6px_rgba(239,68,68,0.5)]' }, // red shadow
    "Not-Delivered": { icon: <XCircle className="h-5 w-5 text-red-500 mt-1" />, color: 'bg-red-100', shadow: 'shadow-[0_4px_6px_rgba(239,68,68,0.5)]' },
};

const OrderCard = ({ order }) => {
    const {
        _id,
        deliveryBoy,
        restaurant,
        items,
        itemTotal,
        deliveryCharge,
        gstAmount,
        discount,
        platformFee,
        totalToPay,
        status,
        deliveryAddress,
        paymentMethod,
        paymentStatus,
        orderNote,
        createdAt,
        updatedAt,
        ETA,
        cancelReason
    } = order;

    const statusInfo = statusStyles[status] || {};
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className={`p-5 ${statusInfo.color} ${statusInfo.shadow} border border-slate-200 rounded-md mb-4`}>
            <div className="flex flex-col md:flex-row gap-5">
                {/* Image Section */}
                <img
                    className="rounded-md w-full md:w-1/3 object-cover"
                    src={restaurant?.imageUrl || defaultRestaurantImage}
                    alt="Restaurant"
                    height={300}
                    width={300}
                />

                {/* Order Details */}
                <div className="flex flex-col gap-4 w-full">
                    <div>
                        <div className='flex items-center mb-4 justify-between'>
                            <p className="font-bold text-xl lg:text-2xl">
                                {restaurant?.name}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-lg">{status}</p>
                                {statusInfo.icon}
                            </div>
                        </div>
                        <p className="text-slate-700 font-bold">
                            {"Order #"}{_id}
                        </p>
                        <p className='text-slate-700 font-bold'>
                            Restaurant Phone: {restaurant?.mobileNumber}
                        </p>
                        <p className="text-slate-700 font-bold">
                            Delivery Address:
                            {" " + deliveryAddress?.addressLine1}, {deliveryAddress?.addressLine2 ? deliveryAddress?.addressLine2 + "," : ""} {deliveryAddress?.city}
                        </p>
                        {deliveryBoy && <> <p className="text-slate-700 font-bold">
                            Delivery Boy:
                            {" " + deliveryBoy?.name}
                        </p>
                            <p className="text-slate-700 font-bold">
                                Delivery Boy Number:
                                {" " + deliveryBoy?.mobileNumber}
                            </p> </>}
                        <p className="text-slate-700 font-bold">
                            Estimated Arrival:
                            {" " + ETA}
                        </p>
                    </div>

                    {
                        orderNote && (
                            <div className='border text-sm rounded-md py-2 px-4 border-slate-500'>
                                <p className="text-slate-700 font-bold">
                                    Note: {orderNote}
                                </p>
                            </div>
                        )
                    }

                    {
                        cancelReason && (
                            <div className='border text-sm rounded-md py-2 px-4 border-slate-500'>
                                <p className="text-slate-700 font-bold">
                                    Cancelling Reason: {cancelReason}
                                </p>
                            </div>
                        )
                    }
                    <div className="flex text-xs justify-between flex-col">
                        <p className="text-slate-700 font-semibold">
                            {"Order Created @ "}{format(new Date(createdAt), 'PPpp')}
                        </p>
                        <p className="text-slate-700 font-semibold">
                            {"Status Updated @ "} {format(new Date(updatedAt), 'PPpp')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <hr className="mt-4 border-t border-slate-500" />
            <div className="mt-4 flex items-center justify-between">
                <button onClick={() => setOpenModal(true)} className="px-4 py-1 font-bold border outline-none border-black text-black rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out">
                    View Items
                </button>
                {/* <div>
                    <p className="font-bold text-sm lg:text-base">
                        {items?.map(item => `${item?.cuisine?.name} x ${item?.quantity}`).join(', ')}
                    </p>
                </div> */}
                <div className="text-lg font-bold">
                    ₹{totalToPay.toFixed(2)}
                </div>
            </div>
            <ItemModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                items={items}
                totalToPay={totalToPay}
                platformFee={platformFee}
                deliveryCharge={deliveryCharge}
                discount={discount}
                itemTotal={itemTotal}
                gstAmount={gstAmount}
            />
        </div>
    );
};

export default OrderCard;
