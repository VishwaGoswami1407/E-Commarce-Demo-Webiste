```md
# 🛒 E-Commerce Demo Website (MERN Stack)

A full-featured e-commerce website built using the **MERN stack** – **MongoDB Atlas**, **Express.js**, **React.js**, and **Node.js**. It allows users to browse products, manage a shopping cart, and securely place orders.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 🛍️ Product Listing with Filtering & Search
- 🛒 Cart Functionality (Add, Remove, Update)
- 💳 Secure Order Placement
- 🧾 Order History Tracking
- 👨‍💼 Admin & User Protected Routes
- ☁️ MongoDB Atlas (Cloud Database)
- ⚙️ RESTful API Integration
- 📱 Fully Responsive UI (React + Tailwind CSS)

---

## 🧑‍💻 Tech Stack

| Technology             | Role                              |
| ---------------------- | --------------------------------- |
| **MongoDB Atlas**      | Cloud-hosted NoSQL database       |
| **Express.js**         | Backend web framework for Node.js |
| **React.js**           | Frontend library for dynamic UIs  |
| **Node.js**            | JavaScript runtime environment    |
| **Tailwind CSS / CSS** | Styling and responsive layout     |
| **JWT**                | Secure user authentication        |
| **Vite**               | Fast frontend tooling for React   |
| **Mongoose**           | MongoDB ODM for schema modeling   |

---

## 📁 Project Structure
```

mern-ecommerce/
├── client/ # React Frontend
│ └── src/
│ ├── pages/
│ ├── components/
│ └── api/
│
├── server/ # Node.js + Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── config/
│
└── README.md

````

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
````

### 2. Backend Setup (Server)

```bash
cd server
npm install
```

Create a `.env` file in `/server` with:

```
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup (Client)

```bash
cd client
npm install
npm run dev
```

> Frontend runs at `http://localhost:5173` and Backend at `http://localhost:5000`

---

## 🌐 API Endpoints Overview

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | `/signup`   | Register a new user  |
| POST   | `/login`    | User login           |
| GET    | `/products` | Fetch product list   |
| POST   | `/cart`     | Add to cart          |
| GET    | `/cart`     | Retrieve user cart   |
| PUT    | `/cart/:id` | Update cart quantity |
| DELETE | `/cart/:id` | Remove from cart     |

---

## 🖼️ Demo Screenshots

| Home Page                       | Product Details Page                  |
| ------------------------------- | ------------------------------------- |
| ![Home](./screenshots/home.png) | ![Product](./screenshots/product.png) |

| Cart Page                       | Checkout Page                           |
| ------------------------------- | --------------------------------------- |
| ![Cart](./screenshots/cart.png) | ![Checkout](./screenshots/checkout.png) |

| Order History                       | Admin Dashboard                   |
| ----------------------------------- | --------------------------------- |
| ![Orders](./screenshots/orders.png) | ![Admin](./screenshots/admin.png) |

> 📝 You can replace the `./screenshots/*.png` with your actual screenshot file names or links.

---

## 🙌 Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/atlas/database) for cloud database
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

```

### ✅ To Finalize:

1. Replace `https://github.com/yourusername/mern-ecommerce.git` with your actual GitHub repo.
2. Put all screenshots in a `screenshots/` folder or use public image URLs.
3. Make sure `.env` is **not pushed to GitHub** (add it to `.gitignore`).

Let me know if you want me to:

- Automatically generate optimized screenshots from your video
- Include a live demo GIF or deploy guide (e.g., with Render/Netlify/Vercel)

I'll update it accordingly.
```
