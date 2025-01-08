import CustomModal from './CustomModal';
import { FaRegCircleDot, FaRegCirclePlay } from 'react-icons/fa6';

const ItemModal = ({ isOpen, onClose, items, itemTotal,
    deliveryCharge,
    gstAmount,
    discount,
    platformFee,
    totalToPay }) => {
    const body = <div>
        <div className="py-4 pr-4 overflow-y-auto max-h-60">
            <ul className="space-y-2">
                {items?.map((item, index) => (
                    <li key={index} className="flex justify-between">
                        <div className="flex items-center space-x-2">
                            {item?.cuisine?.type === "Veg" ? <FaRegCircleDot size={16} color="green" />
                                : <FaRegCirclePlay size={16} style={{ color: "#cc0000" }} className="transform -rotate-90" />}
                            <span>{item?.cuisine?.name}</span>
                        </div>
                        {/* <span>{item?.cuisine.name}</span> */}
                        <div>
                            <span className="font-medium mr-2">x{item?.quantity || 1}</span>
                            <span className="text-green-600">₹{((item?.cuisine?.price || 0) * (item?.quantity || 1)).toFixed(2)}</span>
                        </div>
                    </li>
                )) || <li>No items in order</li>}
            </ul>
        </div>
        <hr className="" />
        <div className="text-sm space-y-2 py-4">
            <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{itemTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>GST</span>
                <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
                <span>Extra discount for you</span>
                <span>-₹{discount.toFixed(2)}</span>
            </div> */}
            <div className="flex justify-between">
                <span>Platform fee</span>
                <span>₹{platformFee.toFixed(2)}</span>
            </div>
        </div>
        <hr className="" />
        <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-green-600">₹{totalToPay.toFixed(2)}</span>
        </div>
    </div>
    return (
        <CustomModal
            body={body}
            isOpen={isOpen}
            onClose={onClose}
            title='Ordered Items'
        />
    )
}

export default ItemModal