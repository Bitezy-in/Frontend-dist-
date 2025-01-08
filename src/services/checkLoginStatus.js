import axiosInstance from "../api/axiosInstance"
const checkUser = async () => {
    try{
        const response = await axiosInstance.get('/check');
        if(response.data.success){
            return response.data.customer
        }
    }
    catch(err){
        console.error(err.message)
        return null;
    }
}

export default checkUser;