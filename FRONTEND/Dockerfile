FROM node:18.20.3-alpine3.20 as build
WORKDIR /app

COPY yarn.lock /app
COPY package.json /app

RUN yarn install

COPY . /app
RUN yarn build

# production environment
FROM nginx:1.27.0-alpine3.19-otel

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

USER appuser

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]