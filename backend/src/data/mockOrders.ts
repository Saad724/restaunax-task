import { Order } from '../../../shared/types'

export const mockOrders: Order[] = [
  {
    id: 'ord_001',
    userId: 'user_001',
    orderType: 'delivery',
    status: 'pending',
    total: 45.97,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    items: [
      { id: 'item_001', name: 'Margherita Pizza', quantity: 2, price: 15.99, createdAt: new Date() },
      { id: 'item_002', name: 'Caesar Salad', quantity: 1, price: 8.99, createdAt: new Date() },
      { id: 'item_003', name: 'Garlic Bread', quantity: 1, price: 5.0, createdAt: new Date() },
    ],
  },
  {
    id: 'ord_002',
    userId: 'user_002',
    orderType: 'pickup',
    status: 'preparing',
    total: 29.98,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    items: [
      { id: 'item_004', name: 'BBQ Chicken Pizza', quantity: 1, price: 18.99, createdAt: new Date() },
      { id: 'item_005', name: 'Mozzarella Sticks', quantity: 1, price: 7.99, createdAt: new Date() },
      { id: 'item_006', name: 'Soft Drink', quantity: 2, price: 3.0, createdAt: new Date() },
    ],
  },
  {
    id: 'ord_003',
    userId: 'user_003',
    orderType: 'delivery',
    status: 'ready',
    total: 67.95,
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    items: [
      { id: 'item_007', name: 'Pepperoni Pizza', quantity: 2, price: 16.99, createdAt: new Date() },
      { id: 'item_008', name: 'Vegetarian Pizza', quantity: 1, price: 15.99, createdAt: new Date() },
      { id: 'item_009', name: 'Greek Salad', quantity: 2, price: 8.99, createdAt: new Date() },
    ],
  },
]