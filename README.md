## 🍽️ Food Ordering Application Assessment

A full stack food ordering platform with separate User and Admin panels, built with a modern web stack.
The application allows users to browse menu items, place orders, and track their order status, while administrators can manage orders and monitor application analytics in real time.

## 📦 Project Structure

The project is divided into two main parts:

```
root
 ├── frontend
 └── backend
```

Frontend – Handles the user interface for both User and Admin panels.

Backend – Provides APIs, authentication, database interaction, and real time communication.

## 🌐 Project Stack

**Project stack:**
- React Typescript
- Material UI
- Node.js/Express
- Socket.IO
- PostgreSQL (Prisma)

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

View .env.example file for variable names.

Example structure:

Backend .env

```
PORT=
DATABASE_CON=
JWT_SECRET=
SALT_ROUNDS=
```

Frontend .env

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

**Note: On successfull server run, admin seeder will be created automatically, however customers need to be registered through signup process**

**Admin Credentials**

```
email: admin@mail.com
password: admin123
```

### 4. Setup Database

Setup your PostgreSQL database and provide database connection string in env file.

After successfully setting up database, run db migrations by:

```
npx prisma migrate dev
```

## 🏗 Implementation Notes

### 1. Backend Approach
The backend follows the MVC (Model–View–Controller) architecture to ensure maintainability and scalability.

**Key implementation details:**

- Route Protection
    - All sensitive routes are protected using authentication middleware to ensure only authorized users can access them.

- Input Validation
    - Request data is validated using Joi with Celebrate middleware to ensure data integrity and prevent malformed requests.

- Controller Based Logic
    - Each feature is handled by dedicated controllers responsible for business logic.

- Service Layer
    - Database interactions are abstracted through service functions to maintain separation of concerns and cleaner controllers.

This layered architecture helps keep the backend modular, testable, and easy to extend.

### 2. Frontend Approach

The frontend is structured into two main panels:

**User Panel**

**Users can:**
- Browse the food menu
- Add menu items to their cart
- Place orders
- View their order history
- Track order status updates in real time

**Admin Panel**

**Administrators can:**
- View application analytics and statistics
- Manage and update orders
- Monitor active orders in the system
- Update order status

When an order status is updated by the admin, the change is reflected in real time on the user's order page.

**Additionally:**
- When a new order is created, admins receive real time notifications.
- Both panels are protected to ensure unauthorized users cannot access sensitive data.

## 🎨 Design Decisions

The application's UI was intentionally designed to resemble a professional data management dashboard.

### 1. Design principles used:

- Minimalistic interface
- Clear data hierarchy
- Simple and intuitive navigation
- Focused user workflows

### 2. Benefits of this approach:

- Faster user onboarding
- Reduced visual clutter
- Easier order tracking and management
- Improved usability for both admins and customers

The clean dashboard style design ensures the application feels professional, efficient, and easy to use.

## 🚀 Additional Features

The application includes several enhancements beyond the basic ordering functionality:

### 1. Analytics Dashboard

Admins can view important application statistics including order trends and activity metrics.

### 2. Real Time Updates

Implemented using Socket.io, enabling:

- Instant order status updates
- Real time notifications for new orders
- Live synchronization between admin and user panels for orders

### 3. Table Search & Filters

Admin tables include search and filtering capabilities, allowing quick access to specific orders or data.

## ⭐ Demo Screenshots ##

### 1. Authentication Screens ###

- **Signin Screen**

<img width="3840" height="1458" alt="auth-1" src="https://github.com/user-attachments/assets/cd5825de-d6bb-482b-96cf-aaba23ff6623" />

- **Signup Screen**

<img width="3840" height="1458" alt="auth-2" src="https://github.com/user-attachments/assets/d0c3efda-5c3e-424e-96e9-36d5418baf67" />

### 2. User Panel Screens ###

- **Menu Screen**

<img width="3700" height="4340" alt="user-1" src="https://github.com/user-attachments/assets/7957d250-cf60-411c-b093-2aa370ce5f57" />

- **User Cart Screen**

<img width="3700" height="1744" alt="user-2" src="https://github.com/user-attachments/assets/4d27eba0-04f9-4870-9600-a65657b7370f" />

- **User Orders Screen**

<img width="3700" height="2076" alt="user-3" src="https://github.com/user-attachments/assets/a1fd065f-6024-4120-825a-97b8899209ef" />

- **User Order Details Screen**

<img width="3700" height="1800" alt="user-4" src="https://github.com/user-attachments/assets/05037940-92ce-447c-8ed7-c876d6267518" />

### 3. Admin Panel Screens ###

- **Admin Dashboard Screen**

<img width="3748" height="1744" alt="admin-1" src="https://github.com/user-attachments/assets/88d549b7-283b-41c4-bc52-fcdd903c2355" />

- **Admin Order Management Screen**

<img width="3700" height="1668" alt="admin-2" src="https://github.com/user-attachments/assets/1f3023a5-a8ea-4887-9910-0b1dfb516a86" />

- **Order Items List Quick View**

<img width="3700" height="1744" alt="admin-3" src="https://github.com/user-attachments/assets/876c3b77-855b-4145-91bb-676baf164ba0" />

- **Quick Update Order View**

<img width="3700" height="1744" alt="admin-4" src="https://github.com/user-attachments/assets/b6f30e25-f17e-4ad7-9c7e-df8d132b2d07" />

- **Admin Order Details Screen**

<img width="2772" height="1744" alt="admin-5" src="https://github.com/user-attachments/assets/4e81962e-2789-4fac-be6b-d39090d1ff23" />

- **Admin Update Order Status**

<img width="2772" height="1744" alt="admin-6" src="https://github.com/user-attachments/assets/c01ea751-2ba3-4c95-a075-397be49935a0" />

