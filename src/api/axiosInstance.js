import axios from "axios";
import { server } from "@/components/constants/config";
const axiosInstance = axios.create({
    baseURL: `${server}/api/v1/customer`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;
