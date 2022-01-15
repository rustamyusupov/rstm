FROM node:latest AS build
WORKDIR /
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build default.conf  /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
