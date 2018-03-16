FROM node:alpine@sha256:0fb8f93d4667e714a52d78a3cd6ec754867d3acabb3a5bab93b31cf6d851d4e2

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
