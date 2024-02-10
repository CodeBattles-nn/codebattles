FROM node:18-alpine as build
WORKDIR /app

COPY yarn.lock /app
COPY package.json /app

RUN npm install

COPY . /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]