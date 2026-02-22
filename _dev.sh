git pull
docker compose --env-file .env.prod down -v
docker compose --env-file .env.prod build --no-cache
docker compose --env-file .env.prod up -d
docker compose --env-file .env.prod logs -f
