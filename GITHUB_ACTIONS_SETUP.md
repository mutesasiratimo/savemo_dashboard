# GitHub Actions & GHCR Deployment Setup

This guide explains how to use the GitHub Actions workflows to automatically build and deploy your Docker image to GitHub Container Registry (GHCR).

## 📋 Prerequisites

1. A GitHub repository for your code
2. GitHub Actions enabled (enabled by default on most repos)
3. (Optional) A server for deployment

## 🚀 Workflows Included

### 1. `docker-publish.yml` - Build and Push to GHCR

**Triggers:**
- Push to `main` or `master` branch
- Push tags matching `v*.*.*` (e.g., v1.0.0)
- Pull requests
- Manual trigger (workflow_dispatch)

**What it does:**
- ✅ Builds Docker image for multiple architectures (amd64, arm64)
- ✅ Pushes to GitHub Container Registry (ghcr.io)
- ✅ Creates multiple tags: `latest`, branch name, commit SHA, version tags
- ✅ Uses build cache for faster builds
- ✅ Only pushes on main branch (not PRs)

### 2. `deploy.yml` - Deploy to Server (Optional)

**Triggers:**
- Manual trigger only (for controlled deployments)

**What it does:**
- ✅ Pulls the specified image from GHCR
- ✅ Deploys to your server via SSH
- ✅ Supports production and staging environments
- ✅ Includes health checks

## 🔧 Setup Instructions

### Step 1: Push to GitHub

If you haven't already, initialize a git repository and push to GitHub:

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit with Docker setup"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Packages

The workflow uses `GITHUB_TOKEN` which is automatically available. No additional setup needed!

### Step 3: Make Repository Package Public (Optional)

By default, GHCR packages are private. To make your image public:

1. Go to your GitHub profile
2. Click "Packages" tab
3. Click on your package (savemo_dashboard)
4. Go to "Package settings"
5. Scroll down and click "Change visibility"
6. Select "Public"

### Step 4: Configure Deployment (Optional)

If you want to use the automatic deployment workflow, add these secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

**Required Secrets:**
- `DEPLOY_HOST`: Your server IP or hostname (e.g., `192.168.1.100`)
- `DEPLOY_USER`: SSH username (e.g., `ubuntu`)
- `DEPLOY_SSH_KEY`: Your private SSH key (the entire key, including `-----BEGIN...` and `-----END...`)

**Optional Secrets:**
- `DEPLOY_PORT`: SSH port (default: 22)
- `DEPLOY_PATH`: Path on server (default: `/opt/savemo-dashboard`)

## 📦 Using the Built Image

### Pull from GHCR

Once the workflow runs, your image will be available at:

```bash
# Pull latest version
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:latest

# Pull specific version
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:v1.0.0
```

### Authenticate with GHCR (for private images)

```bash
# Create a Personal Access Token (PAT) with read:packages scope
# Then login:
echo YOUR_PAT | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

### Run the Image

```bash
docker run -d -p 3000:80 ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
```

Or update your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  savemo-dashboard:
    image: ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
    container_name: savemo-dashboard
    ports:
      - "3000:80"
    restart: unless-stopped
```

## 🎯 Deployment Workflows

### Automatic Deployment (on push to main)

```bash
# Simply push to main branch
git push origin main

# The workflow will:
# 1. Build the Docker image
# 2. Push to GHCR with 'latest' tag
# 3. Available for deployment
```

### Tagged Release

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# The workflow will create multiple tags:
# - v1.0.0
# - v1.0
# - v1
# - latest (if on main branch)
```

### Manual Deployment to Server

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Deploy to Server** workflow
4. Click **Run workflow**
5. Choose:
   - Environment (production/staging)
   - Image tag (default: latest)
6. Click **Run workflow**

The workflow will SSH into your server and deploy the container automatically.

## 🔍 Monitoring Deployments

### View Workflow Runs

1. Go to your repository on GitHub
2. Click **Actions** tab
3. See all workflow runs and their status

### Check Published Packages

1. Go to your GitHub profile
2. Click **Packages** tab
3. View all published images and tags

### Deployment Status

After deployment, check the Actions summary for:
- Image details
- Pull commands
- Deployment status

## 🛠️ Advanced Configuration

### Add Environment Variables

Update the `docker-publish.yml` to pass build arguments:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    build-args: |
      VITE_API_URL=${{ secrets.VITE_API_URL }}
    # ... rest of config
```

### Deploy with Docker Compose

Update the `deploy.yml` script section to use docker-compose:

```yaml
script: |
  cd ${{ secrets.DEPLOY_PATH }}
  echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
  docker-compose pull
  docker-compose up -d
```

### Multiple Environments

Create environment-specific secrets:
1. Go to **Settings** → **Environments**
2. Create environments: `production`, `staging`
3. Add environment-specific secrets

## 📊 Image Tags Explained

The workflow automatically creates these tags:

| Tag Pattern | Example | When |
|-------------|---------|------|
| `latest` | `latest` | Every push to main |
| `main` | `main` | Every push to main |
| `v1.0.0` | `v1.0.0` | When you push tag v1.0.0 |
| `v1.0` | `v1.0` | Same as above |
| `v1` | `v1` | Same as above |
| `main-abc123` | `main-abc123` | Commit SHA on main |
| `pr-123` | `pr-123` | Pull request #123 |

## 🐛 Troubleshooting

### Workflow fails with "permission denied"

Make sure your workflow has the correct permissions. The `docker-publish.yml` already includes:
```yaml
permissions:
  contents: read
  packages: write
```

### Can't pull private image

1. Create a Personal Access Token (PAT) with `read:packages` scope
2. Login to GHCR:
```bash
echo YOUR_PAT | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

### Deployment fails with SSH errors

1. Check your SSH key is correct (include entire key)
2. Verify the server is accessible
3. Check firewall rules
4. Ensure Docker is installed on the server

## 📝 Example: Complete Deployment Flow

```bash
# 1. Make changes locally
vim src/App.tsx

# 2. Commit and push
git add .
git commit -m "Update dashboard UI"
git push origin main

# 3. GitHub Actions automatically:
#    - Builds Docker image
#    - Pushes to ghcr.io/YOUR_USERNAME/savemo_dashboard:latest

# 4. On your server (manual or via workflow):
docker pull ghcr.io/YOUR_USERNAME/savemo_dashboard:latest
docker-compose up -d

# Done! Your app is deployed.
```

## 🎉 Benefits

- ✅ **Automated**: Build and push on every commit
- ✅ **Fast**: Multi-architecture builds with caching
- ✅ **Versioned**: Semantic versioning support
- ✅ **Lightweight**: ~25-30MB final image
- ✅ **Free**: GitHub Container Registry is free for public repos
- ✅ **Secure**: Uses GitHub's built-in authentication
