ifdef COMPOSE
  DOCKER_COMPOSE_PATH=docker-compose.$(COMPOSE).yml
else
  DOCKER_COMPOSE_PATH=docker-compose.yml
endif

DOCKER_COMPOSE_DIR=./tools/docker
DOCKER_COMPOSE_FILE=$(DOCKER_COMPOSE_DIR)/$(DOCKER_COMPOSE_PATH)
DOCKER_COMPOSE=docker-compose -f $(DOCKER_COMPOSE_FILE) --project-directory $(DOCKER_COMPOSE_DIR)

NETWORK=formsite

FLY_CI_PASS=admin
FLY_CI_DIR=./tools/ci
FLY_TASKS=e -c ${FLY_DIR}/tasks
FLY_PIPELINES=sp -c ${FLY_DIR}/pipelines
FLY_SCRIPTS=${FLY_DIR}/scripts
FLY_TARGET=gfatha
FLY=fly -t $(FLY_TARGET)

DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [Targets]
.PHONY: clean_all
clean_all: clean ## Removes all build files
	@sudo rm -rf $(DOCKER_COMPOSE_DIR)/node

.PHONY: clean
clean: ## Removes the environment file and network
	@rm -rf $(DOCKER_COMPOSE_DIR)/.env

.PHONY: init
init: clean ## Init the projects
	@cp $(DOCKER_COMPOSE_DIR)/sys/env/.env $(DOCKER_COMPOSE_DIR)/.env 
	
.PHONY: build
build: ## Build all docker images. Build a specific image by providing the service name via: make build CONTAINER=<service>
	@cd $(SERVICE)/ && \
	./build.sh -t $(TAG)

.PHONY: up
up: init ## Rebuild images (no-cache). Build a specific image via: make build-clean SERVICE=<service>
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
