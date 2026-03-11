import { Server } from "socket.io";
import { Order } from "../../../shared/types";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    const admins = new Set<string>();

    socket.on("join-admin", () => {
      admins.add(socket.id);
      socket.join("admin");
      console.log("Admin connected");
    });

    socket.on("disconnect-admin", () => {
      admins.delete(socket.id);
    });

    socket.on("new-order", (orderId: string) => {
      if (!orderId) return;
      socket.join(`order-${orderId}`);
      console.log(`New order created order-${orderId}`);
    });
  });

  return io;
};

export const emitCreatedOrder = (order: Order) => {
  if (!io) return;
  console.log("Order created, emitting order-created:");
  io.emit("order-created", order);
};

export const emitOrderStatusChange = (order: Order) => {
  if (!io) return;
  console.log("Order status updated, emitting order-status-change:");
  io.to(`order-${order.id}`).emit("order-status-change", order);
};
