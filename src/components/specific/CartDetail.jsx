import axiosInstance from '@/api/axiosInstance';
import { addNewOrder } from '@/redux/order';
import { selectCurrentAddress, selectCustomer } from '@/redux/user';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleInfo, FaRegCircleDot, FaRegCirclePlay } from 'react-icons/fa6';
import { FcIdea } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decrementQuantity, incrementQuantity, selectItems, selectRestaurant } from '../../redux/cart';
import DistanceMatrixCalculator from './DistanceMatrixCalculator';
import ConfirmModal from '../modals/ConfirmModal';

const Popover = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className="absolute bottom-full left-0 mb-2 w-80 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-50">
            {children}
            <button onClick={onClose} className="mt-2 text-sm float-right text-blue-500">Close</button>
        </div>
    );
};

const CartDetail = () => {
    const cartItems = useSelector(selectItems)
    const customer = useSelector(selectCustomer)
    const restaurant = useSelector(selectRestaurant)
    const currentAddress = useSelector(selectCurrentAddress)
    const dispatch = useDispatch()

    const itemTotal = useMemo(() => {
        return cartItems.reduce(
            (amount, item) => item.quantity * item.price + amount, 0
        )
    }, [cartItems])

    const [orderNote, setOrderNote] = useState("")
    const [distance, setDistance] = useState(0);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false)

    const togglePopover = () => {
        setIsPopoverVisible(prev => !prev);
    };

    const closePopover = () => {
        setIsPopoverVisible(false);
    };

    const getDistance = (dist) => {
        console.log(dist);

        setDistance(dist);
    }

    const confirmOrder = async () => {
        const items = cartItems.map(item => ({
            cuisine: item._id,
            quantity: item.quantity,
            price: item.quantity * item.price
        }))
        const orderData = {
            restaurantId: restaurant._id,
            items,
            deliveryAddress: currentAddress,
            paymentMethod: "Cash",
            orderNote,
            itemTotal,
            deliveryCharge,
            gstAmount,
            discount,
            platformFee,
            totalToPay
        }
        try {
            const { data } = await axiosInstance.post('/create-order', orderData)
            if (data.success) {
                toast.success(data.message)
                dispatch(addNewOrder(data.order))
                dispatch(clearCart());
            }
        }
        catch (err) {
            console.error(err.message)
        }
    }

    const handleClose = () => {
        setConfirmOpen(false);
    }

    const handleOrder = () => {
        if (!customer) {
            toast.error("Please login first!!")
            navigate("/login");
            return;
        }
        if (!currentAddress) {
            toast.error("Please select a delivery address")
            return;
        }
        if (distance > 25) {
            toast.error('Too far to deliver!!')
            return
        }
        setConfirmOpen(true);
    }
    const GST_RATE = restaurant?.gstApplicable ? 5 : 0; // 5% GST
    const gstAmount = itemTotal * GST_RATE / 100;
    const deliveryCharge = itemTotal < restaurant?.minimumOrderForFreeDelivery ? restaurant?.deliveryCharge * distance : 0 || 0;
    const platformFee = 5;
    const discount = 0;
    const totalToPay = itemTotal + deliveryCharge + platformFee + gstAmount - discount;
    return (
        <div className="max-h-screen p-4 bg-white shadow-lg rounded-lg flex flex-col">
            {/* Restaurant Info */}
            {
                restaurant?.address && currentAddress && (
                    <DistanceMatrixCalculator
                        lat1={restaurant?.address?.latitude}
                        long1={restaurant?.address?.longitude}
                        lat2={currentAddress?.latitude}
                        long2={currentAddress?.longitude}
                        onCalcDistance={getDistance}
                    />
                )
            }
            <div className="flex items-start mb-4">
                <img
                    src={restaurant?.imageUrl || "https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_1024%2Cc_limit/Prequel-lead.jpg"}
                    alt="Restaurant"
                    className="w-16 h-16 rounded-md mr-4"
                />
                <div>
                    <h3 className="text-lg font-bold">{restaurant?.name}</h3>
                    <p className="text-sm text-gray-500">{restaurant?.address.addressLine1}</p>
                </div>
            </div>

            <hr className="mb-4" />

            {/* Items List */}
            <div className="overflow-y-auto max-h-48 pr-4 flex-grow">
                {/* Your items here */}
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item._id} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                {item?.type === "Veg" ? <FaRegCircleDot size={16} color="green" />
                                    : <FaRegCirclePlay size={16} style={{ color: "#cc0000" }} className="transform -rotate-90" />}
                                <span>{item?.name}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center gap-3 border px-2 py-1">
                                    <button onClick={() => dispatch(decrementQuantity(item._id))} className="text-gray-400 text-4xl">-</button>
                                    <span className="mx-2 text-xl">{item?.quantity}</span>
                                    <button onClick={() => dispatch(incrementQuantity(item._id))} className="text-green-700 text-3xl">+</button>
                                </div>
                                <span>{(+item?.price) * (+item?.quantity)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-4" />

            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Any suggestions? We will pass it on..."
                    className="w-full p-4 border text-slate-500 font-medium border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    onChange={(e) => setOrderNote(e.target.value)}
                />
            </div>
            {/* </div> */}

            <hr className="my-4" />

            {/* Bill Details */}
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span>Item Total</span>
                    <span>{itemTotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>GST ({GST_RATE}%)</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex relative justify-between">
                    <div className='flex gap-2 items-center justify-center'>
                        <span>Delivery Fee</span>
                        <button onClick={togglePopover}>
                            <FaCircleInfo color="#64748B" size={15} />
                        </button>
                        <Popover isVisible={isPopoverVisible} onClose={closePopover}>
                            <p>Enjoy free delivery on your order when you spend ₹{restaurant?.minimumOrderForFreeDelivery} or more!</p>
                        </Popover>
                    </div>
                    <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between">
                    <span>Extra discount for you</span>
                    <span>-₹{discount}</span>
                </div> */}
                <div className="flex justify-between">
                    <span>Platform fee</span>
                    <span>₹{platformFee}</span>
                </div>
            </div>

            <hr className="my-4" />

            {/* Total to Pay */}
            <div className="flex justify-between font-bold text-lg">
                <span>TO PAY</span>
                <span>₹{totalToPay.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className='flex flex-col gap-2'>
                <div className='border border-orange-500 rounded-md p-2'><span className='flex items-center gap-1 text-slate-500 font-bold'><FcIdea size={25} /> split your order for faster delivery</span></div>
                <button
                    onClick={handleOrder}
                    className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                    Order Now
                </button>
            </div>
            <ConfirmModal
                actionLabel={"Place Order"}
                isOpen={confirmOpen}
                onAction={confirmOrder}
                onClose={handleClose}
                title='Confirm Order'
                description={`Your total amount is ₹${totalToPay.toFixed(2)}. Are you sure you want to place order?`}
            />
        </div>
    );
};

export default CartDetail;
