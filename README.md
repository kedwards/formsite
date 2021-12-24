# Formsite

## Building project

This project requires the following technologies:

- Docker
- NodeJs
- React JS
- Express
- MongoDB
- Redux

### Build frontend, and backend

Makefile can be used to build using the following:

    COMPOSE=build SVC=backend CMD="yarn install" make cmd

    COMPOSE=build SVC=frontend CMD="yarn install" make cmd

The equivalent docker run commands:

    docker run -it --rm -v $(pwd):/home/node/backend -w /home/node/backend node:17 yarn install

    docker run -it --rm -v $(pwd):/home/node/frontend -w /home/node/frontend node:17 yarn install

### bring up system

    make up

### seed user data

The build command will initalize the database with three users, the below command can be used to seed more users:

    COMPOSE=build SVC=backend CMD="yarn run data:import" make cmd

The equivalent docker commands:

    docker run -it \
        --rm \
        --net formsite \
        -v $(pwd)/mongo:/dbstuff \
        mongo mongorestore \
        -h mongodb \
        -u localAdmin \
        -p localAdminPassword \
        --authenticationDatabase admin \
        --gzip \
        --archive=/dbstuff/formsite.init.archive

### Add a theme

    cp frontend/src/themes/bootstrap.min.css-superhero frontend/src/bootstrap.min.css

### Login

    http://localhost:3000
    user: sysadmin@formsite.ca
    pass: Password123?
