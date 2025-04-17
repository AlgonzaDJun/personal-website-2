FROM node:21-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

RUN pnpm config set store-dir /app/.pnpm-store

# Salin file dependency dan install
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Salin semua file
COPY . .

# Buka port
EXPOSE 3000

# Jalankan dalam mode dev (hot reload aktif)
CMD ["pnpm", "run", "dev"]