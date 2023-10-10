FROM node:18-alpine

WORKDIR /app

COPY yarn.lock /app
COPY package.json /app

RUN npm install --global serve
RUN yarn

COPY . /app
RUN yarn build

EXPOSE 80:3000

CMD serve -s build