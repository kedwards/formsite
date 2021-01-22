use dynalife

db.createUser(
   {
     user: "dynalifeAdmin",
     pwd: "dynalifeAdmin123",
     roles: [ "readWrite", "dynalife" ]
   }
)

ocker exec -it mongodb  mongo admin     -u localAdmin -p localPass     --eval "db.getSiblingDB('dynalife').createUser({user: 'dynalifeAdmin', pwd: 'dynalifeAdmin123', roles: ['readWrite']})"