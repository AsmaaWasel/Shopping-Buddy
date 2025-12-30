# 🛒 Shopping-Buddy

Frontend E‑commerce application with **Admin Dashboard** built using **React Js** and **FakeStore API**.  
The project focuses on **frontend architecture**, **auth flow**, **role-based routing**, and **data handling** without a real backend.

---

## 🚀 Features

### 🔐 Authentication
- Login using FakeStore API
- Token handling (fake JWT)
- Persistent auth state using LocalStorage
- Role-based access (Admin / User) handled on the frontend

### 👤 User Features
- View products
- View product details
- View personal cart
- Calculate cart total price

### 👑 Admin Dashboard
- View all users
- View all products
- View all carts
- View each user's cart and products
- Admin-only protected routes

---

## 🧠🖥️ Frontend
React.js
Component-based UI, state-driven rendering

React Router DOM
Client-side routing & protected routes

Context API
Global state management (Auth & User State)

🔐 Authentication
FakeStore API – Auth
Login & fake JWT token handling

Role-based Access Control
Admin/User logic handled on the frontend

🔌 Data Layer
Axios
HTTP client for API requests

Service Layer Architecture
Separated API logic (auth, users, products, carts)

🗂️ State & Storage
LocalStorage
Persist authentication state (token, user, role)

🎨 Styling
CSS / CSS Modules / (optional: Tailwind, Bootstrap)

🧪 Development Tools
Git & GitHub

npm

VS Code

🌐 API
FakeStore API
https://fakestoreapi.com



---


Endpoints:
- `/auth/login`
- `/users`
- `/products`
- `/carts`
- `/carts/user/:id`
- `/carts/:id`
- `/users/:id`
- 
---
## 🗂️ Project Structure
---
    src/
 ├─ services/
 │   ├─ api.js
 │   ├─ auth.service.js
 │   ├─ users.service.js
 │   ├─ products.service.js
 │   └─ carts.service.js
 ├─ context/
 │   └─ AuthContext.jsx
 ├─ layouts/
 │   ├─ UserLayout.jsx
 │   └─ AdminLayout.jsx
 ├─ pages/
 │   ├─ Login.jsx
 │   ├─ user/
 │   └─ admin/
 └─ routes/
     └─ AppRoutes.jsx

     
## 🔄 Authentication Flow

---


Login
 ↓
Get Token
 ↓
Fetch User Data
 ↓
Determine Admin
 ↓
Save Auth State
 ↓
Redirect (Admin / User)


---

  


## 🔐 Admin Logic (Important)
The API does **NOT** provide roles.

Admin access is determined on the frontend using a fixed rule:
```js
const isAdmin = user.id === 1;


## 📦 API Used
Base URL:
