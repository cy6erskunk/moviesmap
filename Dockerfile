FROM node:alpine@sha256:727813c2fe5293f8b298cc6e9f927387d94f7781aa602ac7f3f23ae18cc6ca70

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
