FROM node:18-alpine as build
WORKDIR /app

COPY yarn.lock /app
COPY package.json /app

RUN yarn install

COPY . /app
RUN yarn lint
RUN yarn build

# production environment
FROM nginx:stable-alpine

ENV VITE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]