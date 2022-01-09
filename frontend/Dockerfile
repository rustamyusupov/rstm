FROM node:latest AS builder
WORKDIR /
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /dist /usr/share/nginx/html
