FROM node:17 AS builder
WORKDIR /
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY default.conf /etc/nginx/default.conf
COPY --from=builder /dist /usr/share/nginx/html
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
