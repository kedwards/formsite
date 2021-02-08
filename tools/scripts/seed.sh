#!/usr/bin/env bash

# use dynalife
# db.createUser(
#    {
#      user: "dynalifeAdminUser1",
#      pwd: "Df1I4Q&JlO8dMrD",
#      roles: [ "readWrite", "dynalife" ]
#    }
# )

docker exec -it mongodb \
  mongo admin \
  -u  rtlsAdminUser1 \
  -p '3vlM7W#TB1dV^#e' \
  --eval "db.getSiblingDB('dynalife').createUser({user: 'dynalifeAdminUser1', pwd: 'Df1I4Q&JlO8dMrD', roles: ['readWrite']})"