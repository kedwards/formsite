ifdef COMPOSE
  DOCKER_COMPOSE_PATH=docker-compose.$(COMPOSE).yml
else
  DOCKER_COMPOSE_PATH=docker-compose.yml
endif

DOCKER_COMPOSE_DIR=./compose
DOCKER_COMPOSE_FILE=$(DOCKER_COMPOSE_DIR)/$(DOCKER_COMPOSE_PATH)
DOCKER_COMPOSE=docker-compose -f $(DOCKER_COMPOSE_FILE) --project-directory $(DOCKER_COMPOSE_DIR)

NETWORK=formsite

DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ [Targets]
.PHONY: cmd
cmd: # Run command in container. SVC=<service_name>, CMD="<cmd>"
	@$(DOCKER_COMPOSE) run --rm $(SVC) $(CMD)

.PHONY: clean
clean:  down ## clean all services
	@$(DOCKER_COMPOSE_DIR)/run.sh -c

.PHONY: init
init:  ## initialize services
	@$(DOCKER_COMPOSE_DIR)/run.sh -i
	
.PHONY: up
up: init ## Rebuild images (no-cache). Build a specific image via: make build-clean SERVICE=<service>
	@$(DOCKER_COMPOSE) rm -fs $(SVC) && \
	$(DOCKER_COMPOSE) build --pull --no-cache $(SVC) && \
	$(DOCKER_COMPOSE) up -d --force-recreate $(SVC)

.PHONY: down
down:
	@$(DOCKER_COMPOSE) down $(SERVICE) --remove-orphans

.PHONY: remove
remove: ## Stop and remove a service, remove a specific service: SERVICE=<service> make remove
	@$(DOCKER_COMPOSE) rm -fs $(SERVICE)
