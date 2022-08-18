FROM node:18-alpine AS BUILD

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm prune --production


FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/wait-for.sh ./wait-for.sh
COPY --from=BUILD /usr/src/app/bin ./bin
COPY --from=BUILD /usr/src/app/node_modules ./node_modules
COPY --from=BUILD /usr/src/app/public ./public
COPY --from=BUILD /usr/src/app/src ./src

RUN chmod 777 ./wait-for.sh

EXPOSE 3000

CMD [ "node", "./bin/www" ]
