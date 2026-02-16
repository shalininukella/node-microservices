# 🛒 E-Commerce Microservices Backend with API Gateway

## 📌 Project Overview

This project implements a **Microservices-based E-commerce Backend System** using **Node.js + Express + MongoDB + Docker**.
It follows a real-world backend architecture where all client requests pass through an **API Gateway**, which handles authentication, authorization, and routing to internal services.

---

# 🏗 Architecture

```
Client
   │
   ▼
API Gateway (5000 / exposed as 8000)
   │
   ├── Auth Service (5001)
   └── Product Service (5002)
           │
        MongoDB
```

✔ Clients cannot access services directly
✔ Gateway validates JWT before forwarding requests
✔ Services remain independent and stateless

---

# ⚙️ Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt password hashing
* http-proxy-middleware (Gateway routing)
* Docker + Docker Compose
* Swagger API Documentation

---

# 📂 Folder Structure

```
microservices-project/
│
├── api-gateway/
├── auth-service/
├── product-service/
└── docker-compose.yml
```

---

# 🔐 Authentication Flow

1. User registers
2. User logs in
3. Auth service generates JWT
4. Gateway validates token
5. Gateway forwards request to service

---

# 🧪 API Endpoints

---

## 🔑 Auth Service

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /auth/register       | Register user     |
| POST   | /auth/login          | Login + get token |
| GET    | /auth/validate-token | Validate JWT      |

---

## 📦 Product Service

| Method | Endpoint      | Access     |
| ------ | ------------- | ---------- |
| POST   | /products     | Logged in  |
| GET    | /products     | Logged in  |
| GET    | /products/:id | Logged in  |
| PUT    | /products/:id | Logged in  |
| DELETE | /products/:id | ADMIN only |

---

# 🔒 Security Rules

* Passwords are hashed using bcrypt
* JWT used for authentication
* Token validated at gateway
* Role-based authorization enforced
* Only ADMIN can delete products

---

# 🐳 Docker Setup

### Run project

```
docker compose up --build
```

### Stop containers

```
docker compose down
```

### View logs

```
docker compose logs
```

---

# 🧪 Testing Steps

### 1 — Register User

```
POST /auth/register
```

### 2 — Login

```
POST /auth/login
```

Copy returned token.

---

### 3 — Access Protected Routes

Add header:

```
Authorization: Bearer TOKEN
```

Test:

```
GET /products
```

---

### 4 — Admin Test

Register admin:

```json
{
"name":"Admin",
"email":"admin@test.com",
"password":"123456",
"role":"ADMIN"
}
```

Login as admin → use token → delete product.

---

# 📘 Swagger Documentation

Open browser:

```
http://localhost:8000/docs
```

Provides interactive API testing interface.

---

# 🎯 Learning Outcomes

This project demonstrates understanding of:

* Microservices architecture
* API Gateway pattern
* JWT authentication in distributed systems
* Role-based access control
* Containerized services
* Inter-service communication
* Production backend structure

---

# ⭐ Key Architectural Decisions

* Gateway handles security and routing
* Services focus only on business logic
* Prefix routing managed at gateway level
* Services remain independently deployable

---

# 🚀 Possible Improvements (Bonus Features)

* Redis caching
* Centralized logging
* Rate limiting
* Circuit breaker
* Service discovery
* Refresh token system

---

# 👩‍💻 Author

**Shalini Nukella**

---

# 🏁 Conclusion

This project replicates a real-world backend architecture used in modern scalable applications.
It demonstrates production-level concepts including service isolation, authentication delegation, and container orchestration.

---