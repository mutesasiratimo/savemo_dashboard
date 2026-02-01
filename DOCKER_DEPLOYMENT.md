# Docker Deployment Guide

This guide explains how to deploy the Savemo Dashboard using Docker for a lightweight production deployment.

## 🐳 What's Included

- **Multi-stage Dockerfile**: Builds the app and serves it with Nginx (~25-30MB final image)
- **Nginx configuration**: Optimized for React SPA with caching and compression
- **Docker Compose**: Easy orchestration and management
- **.dockerignore**: Excludes unnecessary files from the build

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at: **http://localhost:3000**

### Option 2: Using Docker CLI

```bash
# Build the image
docker build -t savemo-dashboard .

# Run the container
docker run -d -p 3000:80 --name savemo-dashboard savemo-dashboard

# View logs
docker logs -f savemo-dashboard

# Stop and remove the container
docker stop savemo-dashboard
docker rm savemo-dashboard
```

## 🔧 Configuration

### Environment Variables

If your app uses environment variables (like API URLs), you can pass them at build time:

1. Create a `.env.production` file:
```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Savemo Dashboard
```

2. Update the Dockerfile to use them:
```dockerfile
# In the builder stage, after COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

3. Build with arguments:
```bash
docker build --build-arg VITE_API_URL=https://your-api.com -t savemo-dashboard .
```

Or with docker-compose, add to the build section:
```yaml
build:
  context: .
  args:
    VITE_API_URL: https://your-api.com
```

### Port Configuration

Change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 3000 to your desired port
```

## 🏥 Health Check

The deployment includes a health check endpoint at `/health`. Check it with:

```bash
curl http://localhost:3000/health
```

## 📊 Image Size Optimization

The multi-stage build keeps the final image small:
- Builder stage: ~1GB (temporary, discarded)
- Final image: ~25-30MB (nginx:alpine + built assets)

## 🔄 Updates and Rebuilds

To update the application:

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Or with Docker CLI
docker build -t savemo-dashboard .
docker stop savemo-dashboard
docker rm savemo-dashboard
docker run -d -p 3000:80 --name savemo-dashboard savemo-dashboard
```

## 🌐 Production Deployment

### Deploy to a VPS/Server

1. Copy files to your server:
```bash
scp -r ./{Dockerfile,nginx.conf,docker-compose.yml,.dockerignore,package*.json,src,public,index.html,*.config.*,tsconfig.json} user@server:/path/to/app/
```

2. SSH into your server:
```bash
ssh user@server
cd /path/to/app
```

3. Build and run:
```bash
docker-compose up -d
```

### Using with Reverse Proxy (Nginx/Caddy)

If using a reverse proxy, map to a different port:

```yaml
# docker-compose.yml
ports:
  - "127.0.0.1:3000:80"  # Only accessible locally
```

Example Nginx reverse proxy config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs

# Verify port isn't already in use
lsof -i :3000
```

### Build fails
```bash
# Clean build with no cache
docker-compose build --no-cache
```

### Can't access the app
```bash
# Verify container is running
docker ps

# Check if port is properly mapped
docker port savemo-dashboard
```

## 📝 Notes

- The container runs as a non-root user for security
- Gzip compression is enabled for better performance
- Static assets are cached for 1 year
- Client-side routing is properly handled
- Security headers are automatically added
