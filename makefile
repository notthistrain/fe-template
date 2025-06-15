# 默认 SHELL
SHELL := /bin/bash

# 工具路径（可根据需要修改）

.DEFAULT_GOAL := help

help:
	@echo "Available targets:"
	@echo "  install      Install npm dependencies"
	@echo "  lint      		Run lint with fix"
	@echo "  build     		Build frontend project"

install:
	@echo "Linting dependencies install..."
	pnpm i --frozen-lockfile

lint:
	@echo "Linting frontend code..."
	pnpm lint:fix

build:
	@echo "Building frontend project..."
	pnpm build

.PHONY: help install lint build