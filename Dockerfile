FROM node:alpine@sha256:8663740f42a195d2721f950a5f7685a77916875c0b7b36c3e0477efbaf5446e0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app
RUN npm run build
RUN rm -fr lib app webpack.config.js .babelrc

ARG PORT=8080
ARG MAPS_KEY

ENV PORT $PORT
ENV MAPS_KEY $MAPS_KEY

EXPOSE $PORT
CMD ["npm", "start"]
