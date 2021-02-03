FROM node:alpine as builder

COPY package*.json ./

RUN npm install

# second stage
FROM node:14

ARG GIT_COMMIT=
ARG BUILD_DATE=
ARG SOURCE=https://github.com/connectusglobal/formsite-api
ARG VERSION=0.0.0
ARG NODE_ENV=production
ARG DOCKERIZE_VERSION=v0.6.1
ARG PORT=3001

LABEL com.connectusglobal.formsite-api.revision=$GIT_COMMIT
LABEL com.connectusglobal.formsite-api.created=$BUILD_DATE
LABEL com.connectusglobal.formsite-api.source=$SOURCE
LABEL com.connectusglobal.formsite-api.version=$VERSION
LABEL com.connectusglobal.formsite-web.vendor="Connectus Global"
LABEL com.connectusglobal.formsite-web.authors="Connectus IT <it@connectusglobal.com"


# Only use the build arg for local development:
# Mount the secret to /run/secrets:
#COPY use_secret.sh .
#RUN --mount=type=secret,id=thepassword ./use_secret.sh

RUN mkdir -p /home/node/api

WORKDIR /home/node/api/

COPY --from=builder node_modules node_modules

COPY . .

COPY --chown=node:node . .

ENV DOCKERIZE_VERSION ${DOCKERIZE_VERSION}

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

EXPOSE $PORT

CMD [ "node", "src/server" ]