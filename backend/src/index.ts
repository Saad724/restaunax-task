import "dotenv/config";
import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";
import authRouter from "./routes/auth";
import menuRouter from "./routes/menu";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import UserSeeder from "./seeders/user-seeder";
import Utils from "./utils/utils";
import http from "http";
import { initSocket } from "./socket/socket";
import MenuSeeder from "./seeders/menu-seeder";

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

initSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

UserSeeder.adminSeed().then(() => console.log("Admin seeded"));
MenuSeeder.menuSeeder().then(() => console.log("Menu seeded"));

// Routes
app.use("/api/orders", ordersRouter);
app.use("/api/auth", authRouter);
app.use("/api/menu", menuRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Restaunax API is running" });
});

// Celebrate validation error handler (must be after routes)
app.use(Utils.errorHandler);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 Orders API available at http://localhost:${PORT}/api/orders`);
});
