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

    docker volume create backend_modules
    
    docker run -it \
        --rm \
        -v $(pwd)/backend:/home/node/backend \
        -v backend_modules:/home/node/backend/node_modules \
        -w /home/node/backend \
        node:17 yarn install


    docker volume create frontend_modules

    docker run -it \
        --rm \
        -v $(pwd)/frontend:/home/node/frontend \
        -v frontend_modules:/home/node/frontend/node_modules \
        -w /home/node/frontend \
        node:17 yarn install

### Create volume for dtabase

    docker volume create formsite_db
### bring up system

    make up

### Add a theme

The awesome themes from [bootswatch](https://bootswatch.com/) can be used, there are some themes included in this download:

    materia
    sandstone
    sketchy
    slate
    superhero
    yeti

    cp frontend/src/themes/bootstrap.min.css-[theme name] frontend/src/bootstrap.min.css

### Login

    http://localhost:3000
    user: sysadmin@formsite.ca
    pass: Password123?

### seed user data

The build command will initalize the database with three users, The equivalent docker commands:

    docker run -it \
        --rm \
        --net formsite \
        -v $(pwd)/compose/mongo:/dbstuff \
        mongo mongorestore \
        -h mongodb \
        -u localAdmin \
        -p localAdminPassword \
        --authenticationDatabase admin \
        --gzip \
        --archive=/dbstuff/formsite.init.archive

The below command can be used to seed more users:

    COMPOSE=build SVC=backend CMD="yarn run data:import" make cmd