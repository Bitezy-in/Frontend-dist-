// src/utils/emitAsync.js
import socket from '@/socket';

const emitAsync = (event, data) => {
  return new Promise((resolve, reject) => {
    socket.emit(event, data, (response) => {
      if (response.status === 'success') {
        resolve(response);
      } else {
        reject(new Error(response.message));
      }
    });
  });
};

export default emitAsync;
