IMAGE ?= osc-keycloak-scripts-build:latest
TAG ?= $(shell git describe --tags --abbrev=0)-SNAPSHOT

.PHONY: build-container build-jar

build-container:
	docker build -t $(IMAGE) build/

build-jar: build-container
	docker run --rm -v $(shell pwd):/build -w /build \
	$(IMAGE) mvn clean package -Drevision=$(TAG)
