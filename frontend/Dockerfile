FROM node:14 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production environment
FROM nginx:stable

ARG GIT_COMMIT=
ARG BUILD_DATE=
ARG SOURCE=https://github.com/connectusglobal/formsite-web
ARG VERSION=0.0.1
ARG NODE_ENV=production

LABEL com.connectusglobal.formsite-web.revision=$GIT_COMMIT
LABEL com.connectusglobal.formsite-web.created=$BUILD_DATE
LABEL com.connectusglobal.formsite-web.source=$SOURCE
LABEL com.connectusglobal.formsite-web.version=$VERSION
LABEL com.connectusglobal.formsite-web.vendor="Connectus Global"
LABEL com.connectusglobal.formsite-web.authors="Connectus IT <it@connectusglobal.com"

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf.http /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]