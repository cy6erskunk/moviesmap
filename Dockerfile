FROM node:alpine@sha256:f9d9aafffa703739855d60c578f91db1042ae371dc37a04e64bc0b51ae966a3d

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
