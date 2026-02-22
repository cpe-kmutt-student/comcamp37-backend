git pull
docker compose --env-file .env down -v
docker compose --env-file .env build --no-cache
docker compose --env-file .env up -d
docker compose --env-file .env logs -f
