import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  withCredentials: true,
  autoConnect: true,
});

socket.on('connect', () => {
  console.log(`Connected to socket server with id: ${socket.id}`);
});

socket.on('disconnect', (reason) => {
  console.log(`Disconnected from socket server: ${reason}`);
});
