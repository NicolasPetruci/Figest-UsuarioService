# 👤 Figest-UsuarioService

> ⚠️ **Educational Project Notice**: This service is part of the **Figest** financial ecosystem, created for study, research, and testing purposes to demonstrate NestJS authentication and Prisma v7 integration.

---

## 📌 Overview

**Figest-UsuarioService** handles user identity, account management, JWT authentication (Access & Refresh tokens), and database seeding for default admin users.

---

## 🛠️ Tech Stack
* **Framework:** NestJS + TypeScript
* **Database ORM:** Prisma v7 (`@prisma/adapter-pg` driver adapter)
* **Database:** PostgreSQL (Schema: `auth`)
* **Security:** `@nestjs/jwt`, `@nestjs/passport`, `bcryptjs`

---

## 🔐 Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate user & issue tokens |
| `POST` | `/auth/refresh` | Issue new access token using refresh token |
| `POST` | `/auth/logout` | Invalidate refresh token |
| `GET` | `/auth/me` | Fetch authenticated user profile |

---

## 🌱 Database Seeding

The service automatically runs Prisma seed on startup to ensure a default administrator user exists:
* **Admin Email:** `admin@figest.com`
* **Admin Password:** `#Anitinha`

---

## 🚀 Running Locally

```bash
npm install
npx prisma generate
npm run build
npm run start:prod
```
