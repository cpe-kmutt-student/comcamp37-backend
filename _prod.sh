git pull
docker compose -f docker-compose.prod.yml down -v
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d --scale client=3
docker compose -f docker-compose.prod.yml logs -f
