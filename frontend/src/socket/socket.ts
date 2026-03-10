import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  socket = io(import.meta.env.VITE_BACKEND_URL);

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  return socket;
};

export const getSocket = () => socket;