// src/socket.js
import { io } from 'socket.io-client';
import { server } from "@/components/constants/config"
const socket = io(`${server}`);
export default socket;
