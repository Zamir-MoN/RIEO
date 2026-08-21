# RIEO VPS Setup Guide

This guide provides step-by-step instructions for deploying the RIEO full-stack application (Next.js frontend + Express.js backend) on a Linux Virtual Private Server (VPS), such as Ubuntu 22.04 / 24.04 or Debian.

## Prerequisites
Before starting, ensure you have:
1. SSH access to your VPS as a `root` or `sudo` user.
2. A domain name pointed to your VPS's IP address (optional but recommended for production).

---

## 1. System Update & Dependencies

First, update your system packages and install necessary software like Node.js, npm, Git, and Nginx.

```bash
# Update package list and upgrade installed packages
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y

# Install Node.js (Version 20.x is recommended for Next.js 14+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

## 2. Global Process Manager (PM2)

PM2 is a production process manager for Node.js apps. It will keep both the frontend and backend running continuously.

```bash
# Install PM2 globally
sudo npm install -g pm2
```

## 3. Clone and Setup the Project

Navigate to the directory where you want to host the app (e.g., `/var/www` or your home directory) and clone/copy the repository.

```bash
# Clone your repository (Replace with your actual git URL or use SCP to copy files)
git clone https://github.com/your-username/RIEO.git
cd RIEO

# Install all dependencies for the monorepo (frontend & backend)
npm install
```

## 4. Environment Variables Setup

You need to create `.env` files for both the frontend and backend.

### Backend `.env`
```bash
# Navigate to backend
cd backend
nano .env
```
Add the following:
```env
PORT=5145
```
Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### Frontend `.env`
```bash
# Navigate to frontend
cd ../frontend
nano .env
```
Add the following:
```env
# If using a domain and reverse proxy, point this to your API URL
# Example: NEXT_PUBLIC_BACKEND_URL=https://yourdomain.com/api
# If not proxying or accessing via IP directly:
NEXT_PUBLIC_BACKEND_URL=http://<YOUR_VPS_IP>:5145

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=generate_a_very_secure_random_string
```
Save and exit.

## 5. Database Setup (Prisma SQLite)

Initialize the database using Prisma inside the backend folder.

```bash
# Navigate back to backend if you aren't already there
cd ../backend

# Generate Prisma Client
npx prisma generate

# Push the schema to the database (creates dev.db)
npx prisma db push

# Go back to the root folder
cd ..
```

## 6. Build the Frontend

Before starting the frontend, you must build the Next.js production application.

```bash
# Run the build script defined in the root package.json
npm run build
```

## 7. Start Services with PM2

Start both the Express backend and the Next.js frontend using PM2.

```bash
# Start Backend on Port 5145
pm2 start npm --name "rieo-backend" -- run start --workspace=backend

# Start Frontend on Port 3145
pm2 start npm --name "rieo-frontend" -- run start --workspace=frontend

# Save the PM2 list so they restart on server reboot
pm2 save

# Generate a startup script for PM2
pm2 startup
```
*(Note: Run the command output by `pm2 startup` if it prompts you to).*

