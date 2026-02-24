#!/usr/bin/env bash

set -e

ENV_FILE=".env"
IMAGE="ghcr.io/imjustnon/test-comcamp37-server:latest"

# Check if .env exists
if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found"
  exit 1
fi

# Extract DATABASE_URL safely (without sourcing .env)
DATABASE_URL=$(grep -E '^DATABASE_URL=' "$ENV_FILE" | cut -d '=' -f2-)

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not found in .env"
  exit 1
fi

echo "Using DATABASE_URL: ${DATABASE_URL%%@*}@****"

docker build \
  -f Dockerfile.prod \
  --build-arg DATABASE_URL="$DATABASE_URL" \
  -t "$IMAGE" .

echo "Build complete: $IMAGE"