# 🗄️ Client Management API (Backend)

> **Live Base URL:** https://formappdb.onrender.com
> 
> **Frontend Repository:** https://github.com/KubasuIvanSakwa/formapp

## 🚀 Key Features

### 🔌 RESTful Architecture
- Fully compliant REST API supporting **CRUD** operations (Create, Read, Update, Delete).
- Standardized JSON responses with consistent success/error structures.
- Global error-handling middleware for clean debugging and safe failure states.

### 💾 Database & ORM
- **MongoDB Atlas:** Cloud-hosted NoSQL database for flexible schema management.
- **Mongoose:** Strict schema validation to ensure data integrity (e.g., unique Client IDs, required fields).
- **Automated Audit Fields (BTS – Behind The Scenes):**
  - `btsStatus` – Tracks active/closed state.
  - `btsCreatedOn` / `btsModifiedOn` – Auto timestamping.
  - `btsCreatedBy` – User tracking (defaults to `ADMIN`).

### 🔒 Security & Configuration
- **CORS Configured:** Allow-lists defined for Localhost and Vercel frontend.
- **Environment Variables:** Sensitive credentials managed using `dotenv`.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB Atlas  
- **ODM:** Mongoose  
- **Deployment:** Render  
- **Utilities:** cors, dotenv, cookie-parser, nodemon  

---

## 📖 API Documentation

**Base URL:** `/api/v1/clients`

| Method | Endpoint   | Description |
|------:|-----------|-------------|
| GET   | `/`       | Fetch all clients (lightweight list for search). |
| POST  | `/create` | Create a new client record with audit logs. |
| GET   | `/:id`    | Retrieve client details by MongoDB `_id`. |
| PUT   | `/:id`    | Update an existing client. |
| DELETE| `/:id`    | Delete a client record. |

---

### 📌 Sample Payload (Create Client)

```json
{
  "clientID": "CL-001",
  "clientName": "Safaricom Enterprise",
  "clientType": "Enterprises",
  "country": "Kenya",
  "city": "Nairobi"
}
```
## ⚡ Getting Started

### Prerequisites
- Node.js v16+
- MongoDB connection string (Atlas or Local)

---

### Installation
```bash
git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo
npm install
```
Environment Configuration

Create a .env file:

PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/your_db_name
NODE_ENV=development

Run the Server
# Development
```bash
npm run dev
```

# Production
```bash
npm start
```
## 📂 Project Structure
```bash
src/
├── config/
│   └── env.js
├── controllers/
│   └── client.controller.js
├── database/
│   └── mongodb.js
├── middleware/
│   └── error.middleware.js
├── models/
│   └── client.model.js
├── routes/
│   └── api.js
└── app.js
```

## 🚀 Deployment (Render)

Build Command: npm install

Start Command: npm start

Environment Variables: MONGO_URI, NODE_ENV

Render automatically manages the PORT.



📄 License

MIT License. See LICENSE for details.

👨‍💻 Developed By

<h3>Kubasu Ivan Sakwa Full Stack Developer</h3>

