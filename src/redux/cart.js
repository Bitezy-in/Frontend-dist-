// cartSlice.js
import axiosInstance from "@/api/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    restaurant: null,
};

export const saveCartToBackend = createAsyncThunk(
    "cart/saveCartToBackend",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/cart/save", cartData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i._id === item._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },
        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i._id === itemId);

            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i._id === itemId);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter((i) => i._id !== itemId);
                }
            }

            if (state.items.length == 0) {
                state.restaurant = null;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((i) => i._id !== itemId);
        },
        clearCart: (state) => {
            state.items = [];
            state.restaurant = null;
        },
    },
});

export const selectItems = (state) => state.cart?.items;
export const selectRestaurant = (state) => state.cart?.restaurant;

export const {
    addItem,
    setRestaurant,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
