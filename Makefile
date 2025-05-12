COMPOSE_DEV=docker-compose -f compose.dev.yaml --env-file .env.dev 
COMPOSE_PROD=docker-compose -f compose.prod.yaml --env-file .env.prod

dev:
	$(COMPOSE_DEV) up --build -d

dev-down:
	$(COMPOSE_DEV) down

logs-dev:
	$(COMPOSE_DEV) logs -f

prod:
	$(COMPOSE_PROD) up -d --build

prod-down:
	$(COMPOSE_PROD) down

logs-prod:
	$(COMPOSE_PROD) logs -f
