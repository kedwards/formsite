#!/usr/bin/env bash

_USER=localAdmin
_PASSWORD=localAdminPassword

#  rtlsUserAdmin1
# '3vlM7W#TB1dV^#e'

# use dynalife
# db.createUser(
#    {
#      user: "dynalifeAdminUser1",
#      pwd: "Df1I4Q&JlO8dMrD",
#      roles: [ "readWrite", "dynalife" ]
#    }
# )

# docker exec -it mongodb \
#   mongo admin \
#   -u  ${_USER} \
#   -p ${_PASSWORD} \
#   --eval "db.getSiblingDB('dynalife').createUser({user: 'dynalifeAdminUser1', pwd: 'Df1I4Q&JlO8dMrD', roles: ['readWrite']})"

docker run -it --network=admin \
-v $(pwd)/data:/mongostuff \
mongo \
mongoimport --host mongodb -u ${_USER} -p${_PASSWORD} \
--authenticationDatabase=admin -d dynalife -c users \
--file /mongostuff/usersDb.json \
--jsonArray

docker run -it --network=admin \
-v $(pwd)/data:/mongostuff \
mongo \
mongoimport --host mongodb -u ${_USER} -p${_PASSWORD} \
--authenticationDatabase=admin -d dynalife -c forms \
--file /mongostuff/formsDb.json \
--jsonArray
