#!/bin/bash

# Deploy Savemo Dashboard from GitHub Container Registry
# Usage: ./deploy-from-ghcr.sh [image-tag]

set -e

# Configuration
REGISTRY="ghcr.io"
GITHUB_USER="${GITHUB_USER:-YOUR_USERNAME}"  # Set via environment or replace with your username
REPO_NAME="${REPO_NAME:-savemo_dashboard}"   # Replace if different
IMAGE_TAG="${1:-latest}"
CONTAINER_NAME="savemo-dashboard"
PORT="${PORT:-3000}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploying Savemo Dashboard from GHCR${NC}"
echo -e "${BLUE}==========================================${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Construct image name
IMAGE="${REGISTRY}/${GITHUB_USER}/${REPO_NAME}:${IMAGE_TAG}"

echo -e "${YELLOW}📦 Image:${NC} ${IMAGE}"
echo -e "${YELLOW}🐳 Container:${NC} ${CONTAINER_NAME}"
echo -e "${YELLOW}🔌 Port:${NC} ${PORT}:80"
echo ""

# Ask for confirmation
read -p "Continue with deployment? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}📥 Pulling image from GHCR...${NC}"
if ! docker pull "${IMAGE}"; then
    echo -e "${RED}❌ Failed to pull image.${NC}"
    echo -e "${YELLOW}💡 If the image is private, login first:${NC}"
    echo "   docker login ghcr.io -u ${GITHUB_USER}"
    exit 1
fi

echo ""
echo -e "${BLUE}🛑 Stopping existing container...${NC}"
docker stop "${CONTAINER_NAME}" 2>/dev/null || echo "No existing container to stop"
docker rm "${CONTAINER_NAME}" 2>/dev/null || echo "No existing container to remove"

echo ""
echo -e "${BLUE}🚀 Starting new container...${NC}"
docker run -d \
    --name "${CONTAINER_NAME}" \
    --restart unless-stopped \
    -p "${PORT}:80" \
    "${IMAGE}"

echo ""
echo -e "${BLUE}⏳ Waiting for container to be healthy...${NC}"
sleep 3

# Check if container is running
if docker ps | grep -q "${CONTAINER_NAME}"; then
    echo -e "${GREEN}✅ Container is running!${NC}"
    
    # Check health endpoint
    if curl -f -s http://localhost:${PORT}/health > /dev/null; then
        echo -e "${GREEN}✅ Health check passed!${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check endpoint not responding (might still be starting)${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}==========================================${NC}"
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo -e "${GREEN}==========================================${NC}"
    echo ""
    echo -e "${BLUE}📍 Application URL:${NC} http://localhost:${PORT}"
    echo -e "${BLUE}🏥 Health Check:${NC} http://localhost:${PORT}/health"
    echo ""
    echo -e "${YELLOW}Useful commands:${NC}"
    echo "  View logs:    docker logs -f ${CONTAINER_NAME}"
    echo "  Stop:         docker stop ${CONTAINER_NAME}"
    echo "  Restart:      docker restart ${CONTAINER_NAME}"
    echo "  Remove:       docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}"
    echo ""
else
    echo -e "${RED}❌ Container failed to start${NC}"
    echo ""
    echo "View logs with: docker logs ${CONTAINER_NAME}"
    exit 1
fi
