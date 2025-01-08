import Navigation from "./components/Navigation/Navigation";
import socket from './socket'
import { useEffect, useState } from "react";
import checkUser from "./services/checkLoginStatus";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerInformation } from "./redux/user";
import Loader from "./components/layout/Loader";
import getOrders from "./services/getOrders";
import { addOrders, updateOrderStatus } from "./redux/order";
import { addNotification, setNewNotification } from "./redux/notification";
const App = () => {
  const user = useSelector(state => state?.customer?.customerInformation);
  const orders = useSelector(state => state?.order?.orders);
  const dispatch = useDispatch();
  const [screenLoad, setScreenLoad] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const customerData = await checkUser();
      if (customerData) {
        dispatch(setCustomerInformation(customerData))
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false); // Set loading to false after fetching
    }
  };
  const fetchOrders = async () => {
    try {
      const ordersData = await getOrders(orders);
      if (ordersData) {
        dispatch(addOrders(ordersData));
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleOrderStatusUpdate = (data) => {
    const { orderId, status } = data;
    dispatch(updateOrderStatus({ orderId, status }));
    dispatch(addNotification({ orderId, message: `Status of your order with orderId: ${orderId} has been updated to ${status}` }))
    dispatch(setNewNotification());
  };
  useEffect(() => {
    setScreenLoad(true);
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });
    socket.on('orderStatusUpdate', handleOrderStatusUpdate);
    fetchUser();
    fetchOrders();
    setScreenLoad(false)
    return () => {
      socket.off('connect');
      socket.off('orderStatusUpdate', handleOrderStatusUpdate);
    };
  }, [])
  useEffect(() => {
    if (user) {
      socket.emit('joinOwnRoom', ({ customerId: user?._id }));
    }
  }, [user]);
  return screenLoad ? <Loader /> : <Navigation authLoading={authLoading} />

}

export default App