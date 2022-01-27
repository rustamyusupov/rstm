FROM node:17-alpine3.14

WORKDIR /

COPY . .
RUN npm install
RUN npm run build
