.PHONY: all build push

build:
	docker-compose build --force-rm --no-cache

push:
	docker push vivaconagua/auth-frontend
