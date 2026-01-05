# Media Library UI

Frontend application for the Media Library API — allows users to register/login, upload images, browse their personal
asset library, filter/search by tags and metadata, create shareable links, and delete assets.

---

## 1. Project Overview

This frontend is the user-facing web app for the **Media Library** system. It connects to the backend REST API and
provides:

- User authentication (register + login)
- Personal asset library (paginated)
- Upload of image assets (multipart/form-data)
- Filtering assets by:
    - tags
    - MIME type
    - exact creation date (YYYY-MM-DD)
- Share link generation for an asset (expiring link)
- Deleting owned assets

> Note: Backend endpoints are under `/api/v1/...` and require JWT Bearer auth for asset operations.

## 2. Tech Stack

- **React + TypeScript**
- **Vite**
- **Axios**
- **React Router**
- **TanStack Query**

---

## 3. Prerequisites

- **Node.js** (v18+ recommended)
- A running instance of the **Media Library API**
- Package manager: **npm** (or yarn / pnpm)

---

## 4. Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL = http://localhost:3000
```

**Note:** With Vite, only environment variables prefixed with VITE_ are exposed to the client.

---

## 5. Setup and Run

**Development**

```bash
yarn install
yarn dev
```

**Production**

```bash
yarn install
yarn build
```

---

## 6. Available Scripts

- yarn dev — start local development server
- yarn build — build for production
- yarn preview — preview production build
- yarn test — run tests 