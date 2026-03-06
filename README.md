# MERN-BookStore
A full-stack Bookstore web application built with the MERN stack. Users can browse, search, and manage a collection of books with basic CRUD functionality. Ideal for beginners learning full-stack development.

## Live Deployment (Render)

This repo includes a `render.yaml` blueprint that deploys:

1. `mern-bookstore-api` (Node/Express backend)
2. `mern-bookstore-web` (Vite static frontend)

### One-time setup

1. Push this repository to GitHub.
2. In Render, create a new Blueprint service from this repo.
3. Set backend environment variable:
   - `MONGO_URI` = your MongoDB Atlas connection string.
4. Click Deploy.

Render will auto-wire:
- `VITE_API_URL` (frontend -> backend URL)
- `CORS_ORIGIN` (backend -> frontend URL)

### Local environment (optional)

- Backend: copy `server/.env.example` to `server/.env`
- Frontend: copy `client/.env.example` to `client/.env`
