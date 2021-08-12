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
