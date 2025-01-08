import  { useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import Container from '../components/layout/Container'
import RestaurantOrderCard from '@/components/specific/RestaurantOrderCard';

const RestaurantOrder = () => {
    const [currentOrder, setCurrentOrder] = useState({
        user: { name: "VR Goyani" },
        address: "IIIT Sricity, Bh1 hostel",
        order: {
            status: "Pending",
            items: [
                { name: "Pizza Margherita", quantity: 2, price: 12.99 },
                { name: "Cesar Salad", quantity: 1, price: 8.99 },
                { name: "Coca Cola", quantity: 3, price: 1.99 }
            ]
        }
    });

    const handleOrderUpdate = (updatedOrder) => {
        setCurrentOrder(updatedOrder);
    };
    return (
        <AppLayout>
            <Container>
                {
                    currentOrder ? (
                        <RestaurantOrderCard {...currentOrder} onOrderUpdate={handleOrderUpdate} />
                    ) : (
                        <div className='flex items-center justify-center h-screen'>
                            <h1 className='text-xl font-bold'>No active order</h1>
                        </div>
                    )
                }
            </Container>
        </AppLayout>
    )
}

export default RestaurantOrder