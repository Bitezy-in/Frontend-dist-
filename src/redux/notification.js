// src/redux/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newNotification: false,
    notifications: [],
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            const { orderId, message } = action.payload;
            state.notifications.unshift({
                orderId: orderId,
                message
            });
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.orderID !== action.payload
            );
        },

        clearNotifications: (state) => {
            state.notifications = [];
        },

        setNewNotification: (state) => {
            state.newNotification = true;
        },

        clearNewNotification: (state) => {
            // Set newNotification flag to false
            state.newNotification = false;
        }
    },
});

export const { addNotification, removeNotification, clearNotifications, setNewNotification, clearNewNotification } = notificationsSlice.actions;

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;

export default notificationsSlice.reducer;
