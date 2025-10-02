# Task Manager App

A full-stack Task Manager application with user authentication, role-based authorization (admin/user), and CRUD operations for tasks. Built with **Node.js, Express, MongoDB**, and a **React frontend**.

---

## 🛠️ Features

* User authentication (Register/Login)
* Role-based authorization (`admin` and `user`)
* CRUD operations for tasks
* Admin dashboard to manage all tasks
* JWT-based protected routes
* Frontend connected via `fetch` API requests

---

## 📁 Project Structure

```
backend/
├── controllers/         # Express controllers (auth, tasks)
├── middleware/          # Auth middleware (authenticate, authorize)
├── models/              # Mongoose models (User, Task)
├── routes/              # Express routes
├── .env                 # Environment variables (never push to GitHub)
├── server.js            # Entry point for backend
frontend/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React AuthContext
│   ├── pages/           # Dashboard, AdminDashboard, Login, Register
│   └── App.jsx
```

---

## ⚙️ Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env   # setup your environment variables
npm run dev            # start server with nodemon
```

### Frontend

```bash
cd frontend
npm install
npm run dev            # starts React frontend on localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend root:

```
PORT=4000
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET_KEY=<your_jwt_secret>
```

---

## 🖥️ API Endpoints

### Auth

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

### Tasks (User)

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/tasks`     | Create a new task          |
| GET    | `/api/tasks`     | Get all tasks for the user |
| GET    | `/api/tasks/:id` | Get single task            |
| PUT    | `/api/tasks/:id` | Update a task              |
| DELETE | `/api/tasks/:id` | Delete a task              |

### Tasks (Admin)

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| GET    | `/api/tasks/admin/all` | Get all tasks (admin)   |
| DELETE | `/api/tasks/admin/:id` | Delete any task (admin) |

---

## 🚀 Frontend

* Uses **React** with `fetch` for API calls.
* **AuthContext** handles login state and token management.
* Admin dashboard shows all users' tasks and allows admin to delete any task.
* User dashboard shows only the logged-in user's tasks.

---

## 📖 API Documentation

* Postman collection available in `/docs/TaskManager.postman_collection.json`
* Alternatively, you can test endpoints using **Swagger** or Postman.

---

## ⚡ Scalability Notes

* **Microservices**: Separate auth, tasks, and frontend services for scalability.
* **Caching**: Use Redis for frequently requested task data.
* **Load balancing**: Deploy backend behind a load balancer for high traffic.
* **Database scaling**: Use MongoDB sharding for large-scale deployments.

---


