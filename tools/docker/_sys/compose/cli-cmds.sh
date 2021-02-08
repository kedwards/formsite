#!/usr/bin/env bash

# portainer
docker run -itd \
  -p 8000:8000 \
  -p 9000:9000 \
  --name=portainer \
  --network prod \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/portainer/data:/data \
  portainer/portainer-ce

# mongo database
docker run -itd \
  -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -v $(pwd)/mongodb/datadir:/data/db \
  --network prod \
  --name mongodb \
  mongo

# Mongo express
docker run -itd \
  -p 8081:8081 \
  --name=mongoex \
  --network prod \
  --restart=always \
  -e ME_CONFIG_OPTIONS_EDITORTHEME=ambiance \
  -e ME_CONFIG_MONGODB_SERVER=mongodb \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=mongoadmin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=secret \
  mongo-express

# Db Imports 1
docker run -it \
  --network prod \
  -v $(pwd):/mongostuff \
  --rm mongo \
  mongoimport --host mongodb \
  -u mongoadmin \
  -p secret \
  -d dynalife \
  -c users \
  --file /mongostuff/users.json \
  --jsonArray \
  --authenticationDatabase admin

# Db Imports 2
docker run -it \
  --network prod \
  -v $(pwd):/mongostuff \
  --rm mongo \
  mongoimport --host mongodb \
  -u mongoadmin \
  -p secret \
  -d dynalife \
  -c forms \
  --file /mongostuff/forms.json \
  --jsonArray \
  --authenticationDatabase admin

# start backend
docker run -itd \
  --network prod \
  --name backend \
  -p 3003:3003 \
  -e NODE_ENV=production \
  -e PORT=3003 \
  -e REGISTRATION_ENABLED=0 \
  -e LOGIN_ENABLED=1 \
  -e DB_URI='mongodb://mongoadmin:secret@mongodb:27017/dynalife?authSource=admin' \
  -e JWT_SECRET='lshfosnfoshdfohvpng;w4vj0wu0ajc0iayvashvacaf' \
  kevinedwards/formsite-api:0.0.2

# start frontend
docker run -itd \
  --network prod \
  --name frontend \
  -p 80:80 \
  -v ./default.conf.http:/etc/nginx/conf.d/default.conf
  kevinedwards/formsite-web:0.0.3