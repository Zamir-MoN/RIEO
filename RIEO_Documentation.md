# RIEO Project Documentation

## Project Overview
RIEO is a full-stack web application structured as a monorepo. It is divided into a **frontend** client and a **backend** REST API, managed together using npm workspaces. The application is designed to showcase and manage products with a highly interactive, animated, and 3D-enhanced user interface.

## Architecture & Technologies

### Frontend
The frontend is a modern, high-performance web application built with the following stack:
- **Framework:** Next.js (v16.2.11) with React 19.
- **Styling:** Tailwind CSS v4 for utility-first styling and responsive design.
- **Animations & 3D:** 
  - **GSAP & Framer Motion** for fluid, complex UI animations.
  - **Three.js & React Three Fiber / Drei** for rendering 3D elements in the browser.
  - **Lottie-react** for vector-based animations.
  - **Lenis** for smooth scrolling experiences.
- **Authentication:** Custom admin authentication implemented via Next.js Middleware and JWT (JSON Web Tokens) using the `jose` library.

### Backend
The backend serves as a robust RESTful API to manage the application's data:
- **Framework:** Node.js with Express.js.
- **Database:** SQLite, a lightweight, file-based relational database.
- **ORM (Object-Relational Mapping):** Prisma (v5.22.0) used for defining the database schema and interacting with the SQLite database.
- **Features:** Provides CRUD (Create, Read, Update, Delete) endpoints for `Product` management (including fields like title, price, video URL, category, description, and thumbnail).

## How It Works
1. **User Interaction:** Users interact with the visually rich Next.js frontend.
2. **Data Fetching:** The frontend makes HTTP requests to the Express.js backend (e.g., fetching product lists).
3. **Database Operations:** The Express backend receives these requests and uses Prisma Client to query or mutate data in the `dev.db` SQLite database.
4. **Admin Panel:** Administrative actions (like adding or editing products) are protected. The frontend uses Next.js middleware to intercept admin routes, verifying a JWT token before granting access.

## Ports Used
During development and deployment, the application runs on the following default ports:
- **Frontend:** Port `3145` (Accessible via `http://localhost:3145` or your domain)
- **Backend:** Port `5145` (Accessible via `http://localhost:5145`)

## Database Schema Model (Products)
The core entity managed by the backend is a `Product`:
- `id`: Unique Identifier (CUID)
- `title`: Product Name
- `price`: Product Price
- `videoUrl`: URL to the product's video
- `category`: Product Category
- `description`: Optional text description
- `buyUrl`: Optional external purchase link
- `thumbnailUrl`: Optional image thumbnail link
- `createdAt`: Timestamp
