#!/usr/bin/env bash

docker run -it --network=prod \
-v $(pwd):/mongostuff \
mongo \
mongoimport --host mongodb -u mongoadmin -psecret \
--authenticationDatabase=admin -d dynalife -c users \
--file /mongostuff/backend/scripts/data/usersDb.json \
--jsonArray

docker run -it --network=prod \
-v $(pwd):/mongostuff \
mongo \
mongoimport --host mongodb -u mongoadmin -psecret \
--authenticationDatabase=admin -d dynalife -c forms \
--file /mongostuff/backend/scripts/data/formsDb.json \
--jsonArray