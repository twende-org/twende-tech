#!/bin/bash

# =============================
# Script to deploy React + TS app
# using Docker + Nginx
# =============================

# Variables
APP_NAME="twende-frontend"
DOCKER_IMAGE="twendedigital-frontend"
PROJECT_DIR=$(pwd)

# Step 1: Build Docker image
echo "Building Docker image..."
docker build -t $DOCKER_IMAGE $PROJECT_DIR

# Step 2: Stop old container if exists
if [ $(docker ps -a -q -f name=$APP_NAME) ]; then
    echo "Stopping and removing old container..."
    docker stop $APP_NAME
    docker rm $APP_NAME
fi

# Step 3: Run new container
echo "Running new container..."
docker run -d -p 80:80 --name $APP_NAME $DOCKER_IMAGE

echo "✅ Deployment complete!"
echo "Visit http://twendedigital.tech to see your app."