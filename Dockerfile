FROM node:22-slim
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable pnpm

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source
COPY backend/ backend/
COPY frontend/ frontend/

# Generate Prisma client
RUN cd backend && npx prisma generate

# Build frontend
RUN cd frontend && pnpm run build

# Build backend
RUN cd backend && pnpm run build

EXPOSE 3001

CMD ["sh", "-c", "cd backend && npx prisma migrate deploy && node dist/index.js"]
