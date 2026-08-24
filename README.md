# Figest Usuario Service

Microservice responsible for user authentication and management.

## Setup

```bash
npm install
npx prisma generate
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Server port (default: 3001)

## Development

```bash
npm run start:dev
```

## Build & Run

```bash
npm run build
npm run start:prod
```
