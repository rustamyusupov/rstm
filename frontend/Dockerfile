FROM node:17-alpine3.14 AS BUILD

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install

COPY . /usr/src/app

RUN npm run build
RUN npm prune --production


FROM nginx:1.21.6-alpine

COPY --from=BUILD /usr/src/app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD /usr/src/app/dist /usr/share/nginx/html
