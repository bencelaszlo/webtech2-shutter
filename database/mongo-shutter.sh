#!/bin/bash
# Create and Run a MongoDB Server in a Docker Container
MONGO_HOST_IP=172.21.0.10
MONGO_NETWORK_MASK=172.21.0.0/16
MONGO_NETWORK_NAME=mongodb-network

docker network create -d bridge --subnet $MONGO_NETWORK_MASK $MONGO_NETWORK_NAME

docker run --detach --network $MONGO_NETWORK_NAME --ip $MONGO_HOST_IP mongo

chmod +r *.json

mongoimport --host $MONGO_HOST_IP --db shutters --collection shutters shutters.json
mongo --host $MONGO_HOST_IP
