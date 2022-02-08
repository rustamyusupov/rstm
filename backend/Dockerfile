FROM node:17-alpine3.14 AS BUILD

WORKDIR /usr/src/app

COPY server.js /usr/src/app
COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm prune --production


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/server.js ./server.js
COPY --from=BUILD /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "server.js" ]
