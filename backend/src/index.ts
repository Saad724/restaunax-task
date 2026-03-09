import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';
import UserSeeder from './seeders/user-seeder'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

UserSeeder.adminSeed().then(() => console.log("Admin seeded"));

// Routes
app.use('/api/orders', ordersRouter);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Restaunax API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 Orders API available at http://localhost:${PORT}/api/orders`);
});
