import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrders: (state, action) => {
            const orders = action.payload;
            state.orders.push(...orders);
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            console.log(action.payload);
            const order = state.orders.find(order => order._id === orderId);
            if (order) {
                order.status = status;
                order.updatedAt = Date.now();
            }
            console.log(order);
        },
        addNewOrder: (state, action) => {
            const newOrder = action.payload;
            state.orders.unshift(newOrder);
        }
    },
});

export const { addOrders, updateOrderStatus, addNewOrder } = orderSlice.actions;

export default orderSlice.reducer;
