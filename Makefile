# tell Docker to use BuildKit
# tell Compose to use the CLI version of Docker and therefore BuildKit.
# export DOCKER_BUILDKIT=1
# export COMPOSE_DOCKER_CLI_BUILD=1

ifdef COMPOSE
  DOCKER_COMPOSE_PATH=docker-compose.$(COMPOSE).yml
else
  DOCKER_COMPOSE_PATH=docker-compose.yml
endif

DOCKER_COMPOSE_DIR=./tools/docker
DOCKER_COMPOSE_FILE=$(DOCKER_COMPOSE_DIR)/$(DOCKER_COMPOSE_PATH)
DOCKER_COMPOSE=docker-compose -f $(DOCKER_COMPOSE_FILE) --project-directory $(DOCKER_COMPOSE_DIR)

DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [Targets]
.PHONY: clean_all
clean_all: clean ## Removes all build files
	@sudo rm -rf   $(DOCKER_COMPOSE_DIR)/node

.PHONY: clean
clean: ## Removes the temp build files
	@sudo rm -f $(DOCKER_COMPOSE_DIR)/.env-*

.PHONY: clean init
init: ## Init the projects
	@cp $(DOCKER_COMPOSE_DIR)/_sys/env/.env-frontend $(DOCKER_COMPOSE_DIR)/.env-frontend && \
	cp $(DOCKER_COMPOSE_DIR)/_sys/env/.env-backend $(DOCKER_COMPOSE_DIR)/.env-backend

.PHONY: build
build: ## Build all docker images. Build a specific image by providing the service name via: make build CONTAINER=<service>
	@cd $(SERVICE)/ && \
	./build.sh -t $(TAG) -v $(VERSION)

.PHONY: pull
pull: ## Pull images (no-cache). Build a specific image: SERVICE=<service> make up
	@$(DOCKER_COMPOSE) pull $(SERVICE)

.PHONY: up
up: ## Rebuild images (no-cache). Build a specific image via: make build-clean SERVICE=<service>
	@$(DOCKER_COMPOSE) rm -fs $(SERVICE) && \
	$(DOCKER_COMPOSE) build --pull --no-cache --parallel $(SERVICE) && \
	$(DOCKER_COMPOSE) up -d --force-recreate $(SERVICE)

.PHONY: down
down:
	@$(DOCKER_COMPOSE) down $(SERVICE) --remove-orphans

.PHONY: remove
remove: ## Stop and remove a service, remove a specific service: SERVICE=<service> make remove
	@$(DOCKER_COMPOSE) rm -fs $(SERVICE)

.PHONY: service
service: ## install into container. install a specific package: PKG=<package> make install 
	@$(DOCKER_COMPOSE) run --rm ${SERVICE}
