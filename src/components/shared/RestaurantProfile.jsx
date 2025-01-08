import Avatar from '../layout/Avatar'
import { FaStar } from "react-icons/fa6";
import weAreClosed from "@/assets/sorry-we-are-closed.jpg"
import capitalizeWords from '@/utils/capitalizeWords';
const RestaurantProfile = ({ restaurant, open }) => {
    // console.log(open)
    return (
        <div className='flex justify-between'>
            <div className='flex items-center gap-4 pb-6'>
                <Avatar src={restaurant?.imageUrl || "https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_1024%2Cc_limit/Prequel-lead.jpg"} size={"8"} grey={!open} />
                <div className='flex flex-col'>
                    <div className='font-bold text-xl md:text-2xl'>{restaurant?.name}</div>
                    <div className='font-semibold text-sm md:text-lg text-slate-600'>{capitalizeWords(restaurant?.categories.slice(0, 3).join(',') || "Indian, Italian")}</div>
                    <div className="flex items-center mt-1">
                        <FaStar size={18} color="green" />
                        <span className="ml-1 text-green-600 font-semibold">{restaurant?.rating || 4.2}</span>
                        <span className="ml-2 text-gray-600 text-sm">({restaurant?.peopleRated || 28})</span>
                    </div>
                </div>
            </div>
            {!open && <div>
                <img src={weAreClosed} alt='closed' height={300} width={300} className='rounded-lg' />
            </div>}
        </div>
    )
}

export default RestaurantProfile