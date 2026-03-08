import { Order } from '../../../shared/types';

/**
 * Mock order data for development and testing
 * This provides 15 sample orders with various statuses and order types
 *
 * NOTE: Customer data is currently embedded in each order.
 * Think about how you might improve this data structure.
 *
 * IMPORTANT: This data comes from a legacy system. You may want to
 * validate and sanitize it before using in production.
 */

export const mockOrders: Order[] = [
  {
    id: 'ord_001',
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.chen@email.com',
    customerPhone: '+1-555-0101',
    customerRewardPoints: 150,
    orderType: 'delivery',
    status: 'pending',
    total: 45.97,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    items: [
      { id: 'item_001', name: 'Margherita Pizza', quantity: 2, price: 15.99 },
      { id: 'item_002', name: 'Caesar Salad', quantity: 1, price: 8.99 },
      { id: 'item_003', name: 'Garlic Bread', quantity: 1, price: 5.00 },
    ],
  },
  {
    id: 'ord_002',
    customerName: 'Michael Rodriguez',
    customerEmail: 'michael.r@email.com',
    customerPhone: '+1-555-0102',
    customerRewardPoints: 320,
    orderType: 'pickup',
    status: 'preparing',
    total: 32.98, // Total should be 29.98 (18.99 + 7.99 + 3.00)
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_004', name: 'BBQ Chicken Pizza', quantity: 1, price: 18.99 },
      { id: 'item_005', name: 'Mozzarella Sticks', quantity: 1, price: 7.99 },
      { id: 'item_006', name: 'Soft Drink', quantity: 2, price: 3.00 },
    ],
  },
  {
    id: 'ord_003',
    customerName: 'Emily Johnson',
    customerEmail: 'emily.j@email.com',
    customerPhone: '+1-555-0103',
    customerRewardPoints: 85,
    orderType: 'delivery',
    status: 'ready',
    total: 67.95,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_007', name: 'Pepperoni Pizza', quantity: 2, price: 16.99 },
      { id: 'item_008', name: 'Vegetarian Pizza', quantity: 1, price: 15.99 },
      { id: 'item_009', name: 'Greek Salad', quantity: 2, price: 8.99 },
    ],
  },
  {
    id: 'ord_004',
    customerName: 'James Wilson',
    customerEmail: 'james.wilson@email.com',
    customerPhone: '+1-555-0104',
    customerRewardPoints: 540,
    orderType: 'delivery',
    status: 'delivered',
    total: 28.97,
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_010', name: 'Hawaiian Pizza', quantity: 1, price: 17.99 },
      { id: 'item_011', name: 'Chicken Wings', quantity: 1, price: 10.98 },
    ],
  },
  {
    id: 'ord_005',
    customerName: 'Olivia Martinez',
    customerEmail: 'olivia.martinez.email.com', // Invalid email format (missing @)
    customerPhone: '+1-555-0105',
    customerRewardPoints: 220,
    orderType: 'pickup',
    status: 'pending',
    total: 24.97,
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_012', name: 'Cheese Pizza', quantity: 1, price: 14.99 },
      { id: 'item_013', name: 'Onion Rings', quantity: 1, price: 6.99 },
      { id: 'item_014', name: 'Iced Tea', quantity: 1, price: 2.99 },
    ],
  },
  {
    id: 'ord_006',
    customerName: 'Daniel Brown',
    customerEmail: 'daniel.brown@email.com',
    customerPhone: '+1-555-0106',
    customerRewardPoints: 470,
    orderType: 'delivery',
    status: 'preparing',
    total: 54.96,
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_015', name: 'Meat Lovers Pizza', quantity: 2, price: 19.99 },
      { id: 'item_016', name: 'Buffalo Wings', quantity: 1, price: 12.98 },
      { id: 'item_017', name: 'Coleslaw', quantity: 1, price: 2.00 },
    ],
  },
  {
    id: 'ord_007',
    customerName: '', // Empty customer name
    customerEmail: 'sophia.t@email.com',
    customerPhone: '+1-555-0107',
    customerRewardPoints: 95,
    orderType: 'pickup',
    status: 'ready',
    total: 19.97,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_018', name: 'Personal Margherita', quantity: 1, price: 9.99 },
      { id: 'item_019', name: 'Side Salad', quantity: 1, price: 4.99 },
      { id: 'item_020', name: 'Lemonade', quantity: 1, price: 4.99 },
    ],
  },
  {
    id: 'ord_008',
    customerName: 'Liam Anderson',
    customerEmail: 'liam.anderson@email.com',
    customerPhone: '+1-555-0108',
    customerRewardPoints: 680,
    orderType: 'delivery',
    status: 'delivered',
    total: 71.94,
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_021', name: 'Supreme Pizza', quantity: 3, price: 18.99 },
      { id: 'item_022', name: 'Breadsticks', quantity: 2, price: 4.99 },
      { id: 'item_023', name: 'Marinara Sauce', quantity: 2, price: 1.99 },
    ],
  },
  {
    id: 'ord_009',
    customerName: 'Ava Thompson',
    customerEmail: 'ava.thompson@email.com',
    customerPhone: '+1-555-0109',
    customerRewardPoints: -50, // Negative reward points (data corruption)
    orderType: 'pickup',
    status: 'pending',
    total: 38.96,
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_024', name: 'Four Cheese Pizza', quantity: 1, price: 16.99 },
      { id: 'item_025', name: 'Spinach Dip', quantity: 1, price: 8.99 },
      { id: 'item_026', name: 'Tiramisu', quantity: 2, price: 6.49 },
    ],
  },
  {
    id: 'ord_010',
    customerName: 'Noah Garcia',
    customerEmail: 'noah.garcia@email.com',
    customerPhone: '+1-555-0110',
    customerRewardPoints: 390,
    orderType: 'delivery',
    status: 'preparing',
    total: 43.97,
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_027', name: 'Deluxe Pizza', quantity: 1, price: 20.99 },
      { id: 'item_028', name: 'Garden Salad', quantity: 2, price: 7.99 },
      { id: 'item_029', name: 'Soft Drink', quantity: 3, price: 2.00 },
    ],
  },
  {
    id: 'ord_011',
    customerName: 'Isabella Lee',
    customerEmail: 'isabella.lee@email.com',
    customerPhone: '+1-555-0111',
    customerRewardPoints: 210,
    orderType: 'pickup',
    status: 'ready',
    total: 26.98,
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_030', name: 'Veggie Delight Pizza', quantity: 1, price: 15.99 },
      { id: 'item_031', name: 'French Fries', quantity: 1, price: 5.99 },
      { id: 'item_032', name: 'Milkshake', quantity: 1, price: 5.00 },
    ],
  },
  {
    id: 'ord_012',
    customerName: 'Ethan Harris',
    customerEmail: 'ethan.harris@email.com',
    customerPhone: '+1-555-0112',
    customerRewardPoints: 890,
    orderType: 'delivery',
    status: 'delivered',
    total: 89.93,
    createdAt: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_033', name: 'Pepperoni Pizza', quantity: 2, price: 16.99 },
      { id: 'item_034', name: 'BBQ Chicken Pizza', quantity: 2, price: 18.99 },
      { id: 'item_035', name: 'Chicken Wings', quantity: 1, price: 10.98 },
      { id: 'item_036', name: 'Cheesy Bread', quantity: 1, price: 6.99 },
    ],
  },
  {
    id: 'ord_013',
    customerName: 'Mia White',
    customerEmail: 'mia.white@email.com',
    customerPhone: '+1-555-0113',
    customerRewardPoints: 45,
    orderType: 'pickup',
    status: 'pending',
    total: 15.99, // Total should be 12.99 (9.99 + 3.00)
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_037', name: 'Personal Pepperoni', quantity: 1, price: 9.99 },
      { id: 'item_038', name: 'Soft Drink', quantity: 2, price: 3.00 },
    ],
  },
  {
    id: 'ord_014',
    customerName: 'Benjamin Clark',
    customerEmail: 'ben.clark@email.com',
    customerPhone: '+1-555-0114',
    customerRewardPoints: 560,
    orderType: 'delivery',
    status: 'preparing',
    total: 52.96,
    createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_039', name: 'Spicy Italian Pizza', quantity: 2, price: 17.99 },
      { id: 'item_040', name: 'Jalapeño Poppers', quantity: 1, price: 8.99 },
      { id: 'item_041', name: 'Ranch Dressing', quantity: 2, price: 0.99 },
    ],
  },
  {
    id: 'ord_015',
    customerName: 'Charlotte Lewis',
    customerEmail: 'charlotte.lewis@email.com',
    customerPhone: '+1-555-0115',
    customerRewardPoints: 175,
    orderType: 'pickup',
    status: 'ready',
    total: 34.97,
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    items: [
      { id: 'item_042', name: 'White Pizza', quantity: 1, price: 16.99 },
      { id: 'item_043', name: 'Caprese Salad', quantity: 1, price: 9.99 },
      { id: 'item_044', name: 'Cannoli', quantity: 2, price: 3.99 },
    ],
  },
];
