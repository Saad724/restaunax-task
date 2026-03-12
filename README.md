## 🍽️ Food Ordering Application

A full-stack food ordering platform with separate User and Admin panels, built with a modern web stack.
The application allows users to browse menu items, place orders, and track their order status, while administrators can manage orders and monitor application analytics in real time.

## 📦 Project Structure

The project is divided into two main parts:

```
root
 ├── frontend
 └── backend
```

Frontend – Handles the user interface for both User and Admin panels.
Backend – Provides APIs, authentication, database interaction, and real-time communication.

## ⚙️ How to Setup

Follow these steps to run the project locally.

### 1. Install Dependencies
Install required packages for both frontend and backend.

```
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure Environment Variables

Both frontend and backend require environment variables.

Create .env files inside both folders and add the required variables.

Example structure:

Backend .env

```
PORT=
DATABASE_CON=
JWT_SECRET=
SALT_ROUNDS=
```

frontend .env

```
VITE_APP_NAME=
VITE_BACKEND_URL=
VITE_API_URL=
```

Fill these variables according to your environment.

### 3. Run the Development Servers

Start both frontend and backend servers.

Start Backend

```
cd backend
npm run dev
```

Start Frontend

```
cd frontend
npm run dev
```

Once both servers are running, the application should be accessible in your browser.

## 🏗 Implementation Notes

### Backend Approach
The backend follows the MVC (Model–View–Controller) architecture to ensure maintainability and scalability.

**Key implementation details:**

- Route Protection
    - All sensitive routes are protected using authentication middleware to ensure only authorized users can access them.

- Input Validation
    - Request data is validated using Joi with Celebrate middleware to ensure data integrity and prevent malformed requests.

- Controller-Based Logic
    - Each feature is handled by dedicated controllers responsible for business logic.

- Service Layer
    - Database interactions are abstracted through service functions to maintain separation of concerns and cleaner controllers.

This layered architecture helps keep the backend modular, testable, and easy to extend.

### Frontend Approach

The frontend is structured into two main panels:

**User Panel**

Users can:

    - Browse the food menu
    - Add menu items to their cart
    - Place orders
    - View their order history
    - Track order status updates in real time

**Admin Panel**

Administrators can:

    - View application analytics and statistics
    - Manage and update orders
    - Monitor active orders in the system
    - Update order status

When an order status is updated by the admin, the change is reflected in real time on the user's order page.

Additionally:

    - When a new order is created, admins receive real-time notifications.
    - Both panels are protected to ensure unauthorized users cannot access sensitive data.

## 🎨 Design Decisions

The application's UI was intentionally designed to resemble a professional data management dashboard.

### Design principles used:

    - Minimalistic interface
    - Clear data hierarchy
    - Simple and intuitive navigation
    - Focused user workflows

### Benefits of this approach:

    - Faster user onboarding
    - Reduced visual clutter
    - Easier order tracking and management
    - Improved usability for both admins and customers

The clean dashboard-style design ensures the application feels professional, efficient, and easy to use.

## 🚀 Additional Features

The application includes several enhancements beyond the basic ordering functionality:

### 📊 Analytics Dashboard

Admins can view important application statistics including order trends and activity metrics.

### ⚡ Real-Time Updates

Implemented using Socket.io, enabling:

    - Instant order status updates
    - Real-time notifications for new orders
    - Live synchronization between admin and user panels

### 🔍 Table Search & Filters

Admin tables include search and filtering capabilities, allowing quick access to specific orders or data.