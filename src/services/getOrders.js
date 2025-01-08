import axiosInstance from "../api/axiosInstance"
const getOrders = async (orders) => {
    if (orders?.length > 0) return;
    try {
        const { data } = await axiosInstance.get("/get-orders");
        if (data.success) {
            return data.orders;
        }
    } catch (err) {
        console.error("Error fetching orders:", err);
    }
};
export default getOrders;