// src/pages/OrdersPage.jsx
import { useEffect, useState } from 'react';
import OrderCard from '@/components/orders/OrderCard';
import axiosInstance from '@/api/axiosInstance';
import socket from '@/socket';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Container from '../layout/Container';
import RefreshButton from '../layout/RefreshButton';
const OrdersPage = () => {
    const orders = useSelector(state => state.order.orders);
    console.log(orders)
    return (
        <Container>
            <div className='flex items-center justify-between'>
                <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
                <RefreshButton />
            </div>
            {orders?.length === 0 ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                    <p className="text-gray-500">You have no orders.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders?.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default OrdersPage;
