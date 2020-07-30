FROM node:alpine@sha256:2c67c1f5b8907b102920153927b5d7ef85e3f28c67ddf32a5392a4dce1842f61

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
