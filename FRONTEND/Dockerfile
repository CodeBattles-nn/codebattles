FROM node:18-alpine as build
WORKDIR /app

COPY yarn.lock /app
COPY package.json /app

RUN yarn install

COPY . /app
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]