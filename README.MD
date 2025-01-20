# **Node E-Commerce API**

A simple Node.js-based E-Commerce API. Follow the steps below to set up and run the project.

---

## **How to Run**

1. Clone the repository:
   ```bash
   git clone https://github.com/onlydarel/node-ecommerce-api
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run at `http://localhost:5000`.

---

## **Accessing the API**

- Base URL: `http://localhost:5000/api`

### **Example Endpoints**
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch a product by ID
- `POST /api/orders` - Create a new order

---

## **API Documentation**

1. If you want to see the api documentation `http://localhost:5000/`

---

## **Environment Variables**

Set up a `.env` file in the project root with the following:
```
MONGO_URI=<YOUR_MONGO_URI>
PORT=<PORT>
JWT_SECRET=<JWT_SECRET>
JWT_LIFETIME=<30d/1d>
```

---

That’s it! Let me know if you want further tweaks.