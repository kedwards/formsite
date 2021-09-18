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
ARG SOURCE=https://github.com/kedwards/formsite-web
ARG VERSION=0.0.1
ARG NODE_ENV=production

LABEL com.kedwards.formsite-web.revision=$GIT_COMMIT
LABEL com.kedwards.formsite-web.created=$BUILD_DATE
LABEL com.kedwards.formsite-web.source=$SOURCE
LABEL com.kedwards.formsite-web.version=$VERSION
LABEL com.kedwards.formsite-web.vendor="LivITy"
LABEL com.kedwards.formsite-web.authors="kedwards@kevinedwards.ca"

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf.http /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]