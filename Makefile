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

FLY_CI_PASS=admin
FLY_CI_DIR=./tools/ci
FLY_TASKS=e -c ${FLY_DIR}/tasks
FLY_PIPELINES=sp -c ${FLY_DIR}/pipelines
FLY_SCRIPTS=${FLY_DIR}/scripts
FLY_TARGET=hawkeye
FLY=fly -t $(FLY_TARGET)

DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nhawkeye Usage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [hawkeye Targets]
init-env:
	@cp $(DOCKER_COMPOSE_DIR)/config/default.json server/config/default.json

.PHONY: clean
clean: ## Removes the server/config/default.json  file for docker
	@rm -f server/config/default.json

.PHONY: init ## Recreate .env file in the  .docker directory
init: init-env

.PHONY: network
network: 
	@docker network create dev

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
