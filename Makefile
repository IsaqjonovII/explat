CURRENT_DIR=$(shell pwd)

APP=$(shell basename ${CURRENT_DIR})

APP_CMD_DIR=${CURRENT_DIR}/cmd

REGISTRY=registry.uicgroup.tech
TAG=dev
ENV_TAG=dev
PROJECT_NAME=go-invest-backoffice

docker-login:
	docker login -u ${REGISTRY_USER} -p ${REGISTRY_PASSWORD} ${REGISTRY}

build-image:
	docker build --cache-from ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} -t ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} .
	docker tag ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}

push-image:
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG}
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}

clear-image:
	docker rmi ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG}
	docker rmi ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}

vars-input:
	cat ${DEV_KEYS} >> .env
	
