# Multi-stage build for lightweight deployment

# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies needed for npm and build tools
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies needed for build)
# npm ci is faster and more reliable for CI/CD when package-lock.json exists
RUN npm ci --no-audit

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx (lightweight)
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
