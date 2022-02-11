FROM node:17-alpine3.14 AS BUILD

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm prune --production


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/bin ./bin
COPY --from=BUILD /usr/src/app/node_modules ./node_modules
COPY --from=BUILD /usr/src/app/src ./src
COPY --from=BUILD /usr/src/app/db.json ./db.json

EXPOSE 3000

CMD [ "node", "./bin/www" ]
