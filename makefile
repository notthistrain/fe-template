SHELL := /bin/bash

# $$转义
VTYPE ?= patch
NPM_REGISTRY := https://registry.npmmirror.com/

.DEFAULT_GOAL := help

help:
	@echo "Available Targets On Linux System"
	@echo "		install				Install npm dependencies"
	@echo "		release				Update changelog and version"
	@echo "		lint					Install npm dependencies"
	@echo "		rpm						Update changelog and version"
	@echo "		container			Update changelog and version"

install:
	@echo "Install frontend dependencies..."
	npm i -g pnpm --registry $(NPM_REGISTRY)
	pnpm i --frozen-lockfile --registry $(NPM_REGISTRY)
	@echo "Install complete!"

release:
	@if [ -z "$(VTYPE)" ]; then \
		echo "Warning: VTYPE is required. Usage: make release VTYPE=major, default 'patch'"; \
	fi
	@echo "Release frontend project...!"
	pnpm release --release-as $(VTYPE)
	@echo "Release complete!"

lint:
	docker build \
		--build-arg PNPM_CACHE_DIR=$(PNPM_CACHE_DIR) \
		--build-arg NPM_REGISTRY=$(NPM_REGISTRY) \
		--cache-from $(CI_PROJECT_NAME):latest \
		--target $(TARGET_IMAGE) \
		-f .config/Dockerfile .

image:
	@echo "Build version: $(BUILD_VERSION)"
	@echo "Build time: $(BUILD_TIME)"
	docker build \
		--build-arg BUILD_VERSION=$(BUILD_VERSION) \
		--build-arg BUILD_TIME=$(BUILD_TIME) \
		--build-arg PNPM_CACHE_DIR=$(PNPM_CACHE_DIR) \
		--build-arg NPM_REGISTRY=$(NPM_REGISTRY) \
		--cache-from $(CI_PROJECT_NAME):latest \
		--target $(TARGET_IMAGE) \
		-t $(CI_PROJECT_NAME):$(BUILD_VERSION) \
		-t $(CI_PROJECT_NAME):$(TARGET_TAG) \
		-f .config/Dockerfile .
	docker save -o $(CI_PROJECT_NAME)-$(BUILD_VERSION).tar $(CI_PROJECT_NAME):$(BUILD_VERSION)

rpm: image
	@mkdir -p $(RPM_TOP_DIR)/BUILD \
		|| { echo "Failed to create directory $(RPM_TOP_DIR)/BUILD"; exit 1; }
	@cp -f $(CI_PROJECT_NAME)-$(BUILD_VERSION).tar $(RPM_TOP_DIR)/BUILD \
		|| { echo "Failed to copy tar file"; exit 1; }
	@rpmbuild -bb \
		--define "_topdir $(RPM_TOP_DIR)" \
		--define "name $(CI_PROJECT_NAME)" \
		--define "version $(BUILD_VERSION)" \
		--define "release $(BUILD_RELEASE)" \
		.config/.spec \
		|| { echo "RPM build failed"; exit 1; }
	@cp -f $(RPM_TOP_DIR)/RPMS/x86_64/$(CI_PROJECT_NAME)-$(BUILD_VERSION)-$(BUILD_RELEASE).x86_64.rpm $(ARTIFACT_DIR) \
		|| { echo "Failed to copy RPM"; exit 1; }

container: image
	docker ps -aq --filter "name=$(CI_PROJECT_NAME)" | xargs -r docker rm -f || true
	docker run --name=$(CI_PROJECT_NAME) --net=host --restart=always -d $(CI_PROJECT_NAME):dev

.PHONY: help install release lint rpm container