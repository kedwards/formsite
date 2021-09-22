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

```sh
COMPOSE=build SVC=backend CMD="yarn install" make cmd
COMPOSE=build SVC=frontend CMD="yarn install" make cmd
```
### bring up system
```sh
make up
```

### seed user data
```sh
COMPOSE=build SVC=backend CMD="yarn run data:import" make cmd
```

### Add a theme
```sh
cp frontend/src/themes/bootstrap.min.css-superhero frontend/src/bootstrap.min.css
```

### Login

```sh
http://localhost:3000

user: sysadmin@formsite.ca
pass: Password123?
```