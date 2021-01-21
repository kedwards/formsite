# GFatha Consoles

## Building project

This project requires the following technologies:

- Docker
- NodeJs
- React JS
- Express
- MongoDB

### Build frontend

```sh
COMPOSE=build SERVICE=frontend CMD=un PKG='redux-thunk redux-devtools-extension' make service
```

```
COMPOSE=build SERVICE=frontend CMD=i PKG='@reduxjs/toolkit' make service
```

```sh
COMPOSE=build SERVICE=frontend CMD=i make service
```

```sh
COMPOSE=dev SERVICE=frontend make up
```
