#!/usr/bin/env bash

# localhost - admin
#
USER=localAdmin
PASSWORD=localAdminPassword
DB=admin
CMD='db.createUser({ user: "test", pwd: "test", roles: [ { role: "root", db: "admin" } ] });'

# localhost -  dynalife
#
#USER=dynalifeAdminUser1
#PASSWORD=callMe!12
#CMD="use dynalife; db.updateUser('dynalifeAdminUser1', { pwd: passwordPrompt() } )"

# dynaife
# _USER=dynalifeRootAdmin1
# _PASSWORD=callMe!12

# rtlsdemo srver
#  rtlsUserAdmin1
# '3vlM7W#TB1dV^#e'


# use dynalife
# db.createUser(
#    {
#      user: "dynalifeApplicationAdmin1",
#      pwd: "Df1I4Q&JlO8dMrD",
#      roles: [{ role: "readWrite", db: "dynalife" }]
#    }
# )

# docker exec -it mongodb \
#   mongo admin \
#   -u  ${_USER} \
#   -p ${_PASSWORD} \
#   --eval "db.getSiblingDB('dynalife').createUser({user: '${_USER}', pwd: '${_PASSWORD}', roles: ['readWrite']})"

# docker exec -it mongodb \
#   mongo admin \
#   -u  ${_USER} \
#   -p ${_PASSWORD} \
#   --eval "db.getSiblingDB('dynalife').createUser({user: '${_USER}', pwd: '${_PASSWORD}', roles: ['readWrite']})"

docker exec -it mongodb \
  mongo ${DB} \
  -u  ${USER} \
  -p ${PASSWORD} \
  --eval ${CMD}

# docker run -it --network=admin \
# -v $(pwd)/data:/mongostuff \
# mongo \
# mongoimport --host mongodb -u ${_USER} -p${_PASSWORD} \
# --authenticationDatabase=admin -d dynalife -c users \
# --file /mongostuff/usersDb.json \
# --jsonArray

# docker run -it --network=admin \
# -v $(pwd)/data:/mongostuff \
# mongo \
# mongoimport --host mongodb -u ${_USER} -p${_PASSWORD} \
# --authenticationDatabase=admin -d dynalife -c forms \
# --file /mongostuff/formsDb.jso