
<h1 align="center" style="font-weight: bold;">E-Commerce Backend API 💻</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>

 
</p>


<p align="center">This project is the backend service for an E-Commerce platform, built using Node.js, Express.js, and MongoDB. It provides a RESTful API that handles all the core functionalities required for an online shopping application, including user authentication, product management, and order processing.</p>


<p align="center">
<a href="https://github.com/EsraaRgb/E-Commerce-Backend-API">📱 Visit this Project</a>
</p>

<h2 id="technologies">💻 Technologies</h2>

**Backend** Node.js, Express.js

**Database** MongoDB with Mongoose for object data modeling (ODM)

**Authentication** JSON Web Tokens (JWT)

**Cloudinary Cloud-based image and video management, including upload, storage, and transformation.

<h2 id="started">🚀 Getting started</h2>

Follow these steps to set up and run the E-Commerce Backend API on your local machine.



<h4>Prerequisites</h4>

Here's a list of prerequisites for running a project, formatted similarly to your example:

- [Node.js](https://nodejs.org/) - Ensure you have Node.js installed for running the server and managing dependencies.
- [MongoDB](https://www.mongodb.com/) - Required for the database functionality.
- [Postman](https://www.postman.com/) - Useful for testing API endpoints.
- [Git](https://git-scm.com/) - For version control and managing your project's codebase.

Make sure to have these prerequisites installed and properly configured before starting the project.

---


<h4>Cloning</h4>

How to clone your project

```bash
git clone https://github.com/EsraaRgb/E-Commerce-Backend-API/
```

<h4>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with essential and secrets Credentials

<h4>Starting</h4>

To start This Node.js project, follow these steps:

1. **Navigate to the Project Directory**:
    ```bash
    cd E-Commerce-Backend-API
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Server**:
    ```bash
    npm start
    ```

---

<h2 id="routes">📍 API Endpoints</h2>

<p>Here is a list of the main API routes, along with the expected request bodies for each:</p>

---

# <h4>Authentication API Routes</h4>

Here is a list of the authentication-related API routes, along with the expected request bodies and responses for each:

| Method | Route                                    | Description                                               |
|--------|------------------------------------------|-----------------------------------------------------------|
| POST   | `http://localhost:3000/auth/signup`       | Registers a new user. See [request details](#post-signup) |
| GET    | `http://localhost:3000/auth/confirmEmail/:token` | Confirms a user's email using a token. Example: `/confirmEmail/abc123` See [request details](#get-confirmemail-token) |
| POST   | `http://localhost:3000/auth/signin`       | Authenticates a user and returns a JWT. See [request details](#post-signin) |
| GET    | `http://localhost:3000/auth/`             | Returns a simple message about the User Module. See [request details](#get-user-module) |

### <h4 id="post-signup">POST http://localhost:3000/auth/signup</h4>

**REQUEST**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "strongpassword"
}
```

**RESPONSE**
```json
{
  "message": "User registered successfully. Please check your email to confirm your account."
}
```

### <h4 id="get-confirmemail-token">GET http://localhost:3000/auth/confirmEmail/:token</h4>

**REQUEST**
- No body required. The token is passed as a URL parameter (e.g., `/confirmEmail/abc123`).

**RESPONSE**
```json
{
  "message": "Email confirmed successfully."
}
```

### <h4 id="post-signin">POST http://localhost:3000/auth/signin</h4>

**REQUEST**
```json
{
  "email": "johndoe@example.com",
  "password": "strongpassword"
}
```

**RESPONSE**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
}
```

---

### <h4 id="get-user-module">GET http://localhost:3000/auth/</h4>

**DESCRIPTION**
- This API endpoint is only accessible to admins.

**REQUEST**
- No body required.

**RESPONSE**
```json
{
  "users": [
    {
      "userName": "john_doe",
      "email": "john@example.com",
      "phone": "+123456789",
      "role": "User",
      "active": true,
      "confirmEmail": true,
      "blocked": false,
      "image": "image_url1",
      "DOB": "1990-01-01"
    },
    {
      "userName": "jane_smith",
      "email": "jane@example.com",
      "phone": "+987654321",
      "role": "Admin",
      "active": true,
      "confirmEmail": true,
      "blocked": false,
      "image": "image_url2",
      "DOB": "1985-05-15"
    }
  ]
}
```

---

# <h4>Authentication Header Requirement</h4>

**DESCRIPTION**
- For all API requests that require authentication, you must include an `Authorization` header with your request. This header should contain the JWT token.

**HEADER FORMAT**
- **Field Name:** `Authorization`
- **Value:** `Bearer YOUR_JWT_TOKEN`

**EXAMPLE Request **
```http
GET http://localhost:3000/auth/
{
  "method": "GET",
  "url": "http://localhost:3000/your-endpoint",
  "headers": {
    "Authorization": "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json"
  }
}

```

**NOTE**
- The token is required to access protected routes and perform actions based on the user's role and permissions.

---

---

# <h4>Category API Routes</h4>

| Method | Route                                    | Description                                               |
|--------|------------------------------------------|-----------------------------------------------------------|
| GET    | `http://localhost:3000/category/`         | Retrieves all categories. See [request details](#get-all-categories) |
| POST   | `http://localhost:3000/category/add`      | Adds a new category. See [request details](#post-add-category) |
| PUT    | `http://localhost:3000/category/:id`      | Updates an existing category. Example: `/5` See [request details](#put-update-category) |
| GET    | `http://localhost:3000/category/:id/subCategory` | Sub-category routes. Example: `/5/subCategory` See [sub-category routes](#sub-category-routes) |

### <h4 id="get-all-categories">GET http://localhost:3000/category/</h4>

**REQUEST**
- No body required.

**RESPONSE**
```json
[
  {
    "id": "category1",
    "name": "Category 1",
    "image": "image_url"
  },
  {
    "id": "category2",
    "name": "Category 2",
    "image": "image_url"
  }
]
```

### <h4 id="post-add-category">POST http://localhost:3000/category/add</h4>

**REQUEST**
```json
{
  "name": "New Category",
  "image": "image_url"
}
```

**RESPONSE**
```json
{
  "message": "Category added successfully."
}
```

### <h4 id="put-update-category">PUT http://localhost:3000/category/:id</h4>

**REQUEST**
```json
{
  "name": "Updated Category",
  "image": "updated_image_url"
}
```

**DESCRIPTION**
- The `id` in the URL should be replaced with the category ID (e.g., `/5`).

**RESPONSE**
```json
{
  "message": "Category updated successfully."
}
```

---

# <h4>Sub-Category API Routes</h4>

| Method | Route                                    | Description                                               |
|--------|------------------------------------------|-----------------------------------------------------------|
| GET    | `http://localhost:3000/subCategory/`     | Retrieves all sub-categories. See [request details](#get-all-sub-categories) |
| POST   | `http://localhost:3000/subCategory/add`  | Adds a new sub-category. See [request details](#post-add-sub-category) |
| PUT    | `http://localhost:3000/subCategory/:id`  | Updates an existing sub-category. Example: `/5` See [request details](#put-update-sub-category) |

### <h4 id="get-all-sub-categories">GET http://localhost:3000/subCategory/</h4>

**REQUEST**
- No body required.

**RESPONSE**
```json
[
  {
    "id": "subCategory1",
    "name": "Sub-Category 1",
    "image": "image_url"
  },
  {
    "id": "subCategory2",
    "name": "Sub-Category 2",
    "image": "image_url"
  }
]
```

### <h4 id="post-add-sub-category">POST http://localhost:3000/subCategory/add</h4>

**REQUEST**
```json
{
  "name": "New Sub-Category",
  "image": "image_url"
}
```

**RESPONSE**
```json
{
  "message": "Sub-category added successfully."
}
```

### <h4 id="put-update-sub-category">PUT http://localhost:3000/subCategory/:id</h4>

**REQUEST**
```json
{
  "name": "Updated Sub-Category",
  "image": "updated_image_url"
}
```

**DESCRIPTION**
- The `id` in the URL should be replaced with the sub-category ID (e.g., `/5`).

**RESPONSE**
```json
{
  "message": "Sub-category updated successfully."
}
```

---

# <h4>Product API Routes</h4>

| Method | Route                                    | Description                                               |
|--------|------------------------------------------|-----------------------------------------------------------|
| GET    | `http://localhost:3000/product/`         | Retrieves all products. See [request details](#get-all-products) |
| POST   | `http://localhost:3000/product/`         | Adds a new product. See [request details](#post-add-product) |
| PUT    | `http://localhost:3000/product/:id`      | Updates an existing product. Example: `/5` See [request details](#put-update-product) |

### <h4 id="get-all-products">GET http://localhost:3000/product/</h4>

**REQUEST**
- No body required.

**RESPONSE**
```json
[
  {
    "id": "product1",
    "name": "Product 1",
    "images": ["image_url1", "image_url2"],
    "price": 100
  },
  {
    "id": "product2",
    "name": "Product 2",
    "images": ["image_url1", "image_url2"],
    "price": 150
  }
]
```

### <h4 id="post-add-product">POST http://localhost:3000/product/</h4>

**REQUEST**
```json
{
  "name": "New Product",
  "images": ["image_url1", "image_url2"],
  "price": 200
}
```

**RESPONSE**
```json
{
  "message": "Product added successfully."
}
```

### <h4 id="put-update-product">PUT http://localhost:3000/product/:id</h4>

**REQUEST**
```json
{
  "name": "Updated Product",
  "images": ["updated_image_url1", "updated_image_url2"],
  "price": 250
}
```

**DESCRIPTION**
- The `id` in the URL should be replaced with the product ID (e.g., `/5`).

**RESPONSE**
```json
{
  "message": "Product updated successfully."
}
```

---

# <h4>Brand API Routes</h4>

| Method | Route                                    | Description                                               |
|--------|------------------------------------------|-----------------------------------------------------------|
| GET    | `http://localhost:3000/brand/`           | Retrieves all brands. See [request details](#get-all-brands) |
| GET    | `http://localhost:3000/brand/:id`        | Retrieves a specific brand. Example: `/5` See [request details](#get-brand-by-id) |
| POST   | `http://localhost:3000/brand/add`        | Adds a new brand. See [request details](#post-add-brand) |
| PUT    | `http://localhost:3000/brand/:id`        | Updates an existing brand. Example: `/5` See [request details](#put-update-brand) |

### <h4 id="get-all-brands">GET http://localhost:3000/brand/</h4>

**REQUEST**
- No body required.

**RESPONSE**
```json
[
  {
    "id": "brand1",
    "name": "Brand 1",
    "image": "image_url"
  },
  {
    "id": "brand2",
    "name": "Brand 2",
    "image": "image_url"
  }
]
```

### <h4 id="get-brand-by-id">GET http://localhost:3000/brand/:id</h4>

**REQUEST**
- No body required.

**DESCRIPTION**
- The `id` in the URL should be replaced with the brand ID (e.g., `/5`).

**RESPONSE**
```json
{
  "id": "brand1",
  "name": "Brand 1",
  "image": "image_url"
}
```

### <h4 id="post-add-brand">POST http://localhost:3000/brand/add</h4>

**REQUEST**
```json
{
  "name": "New Brand",
  "image": "image_url"
}
```

**RESPONSE**
```json
{
  "message": "Brand added successfully."
}
```

### <h4 id="put-update-brand">PUT http://localhost:3000/brand/:id</h4>

**REQUEST**
```json
{
  "name": "Updated Brand",
  "image": "updated_image_url"
}
```

**DESCRIPTION**
- The `id` in the URL should be replaced with the brand ID (e.g., `/5`).

**RESPONSE**
```json
{
  "message": "Brand updated successfully."
}
```

---

# <h4>Wishlist API Routes</h4>

| Method | Route                                    | Description                                               |
|--------|------------------------------------------|-----------------------------------------------------------|
| GET    | `http://localhost:3000/wishlist/`        | Retrieves the user's wishlist. See [request details](#get-wishlist) |
| PATCH  | `http://localhost:3000/wishlist/add`     | Adds an item to the wishlist. See [request details](#patch-add) |
| PATCH  | `http://localhost:3000/wishlist/remove`  | Removes an item from the wishlist. See [request details](#patch-remove) |

### <h4 id="get-wishlist">GET http://localhost:3000/wishlist/</h4>

**REQUEST**
- No body required.

**RESPONSE**
```json
{
  "wishlist": [
    {
      "id": "product1",
      "name": "Product 1",
      "image": "image_url"
    },
    {
      "id": "product2",
      "name": "Product 2",
      "image": "image_url"
    }
  ]
}
```

### <h4 id="patch-add">PATCH http://localhost:3000/wishlist/add</h4>

**REQUEST**
```json
{
  "productId": "product1"
}
```

**RESPONSE**
```json
{
  "message": "Item added to wishlist successfully."
}
```

### <h4 id="patch-remove">PATCH http://localhost:3000/wishlist/remove</h4>

**REQUEST**
```json
{
  "productId": "product1"
}
```

**RESPONSE**
```json
{
  "message": "Item removed from wishlist successfully."
}
```

---
