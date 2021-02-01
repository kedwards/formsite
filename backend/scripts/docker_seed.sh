#!/usr/bin/env bash

docker run -it --network=dev \
-v $(pwd):/mongostuff \
mongo \
mongoimport --host mongodb -u localAdmin -plocalPass \
--authenticationDatabase=admin -d dynalife -c users \
--file /mongostuff/backend/src/data/usersDb.json \
--jsonArray

docker run -it --network=dev \
-v $(pwd):/mongostuff \
mongo \
mongoimport --host mongodb -u localAdmin -plocalPass \
--authenticationDatabase=admin -d dynalife -c forms \
--file /mongostuff/backend/src/data/formsDb.json \
--jsonArray