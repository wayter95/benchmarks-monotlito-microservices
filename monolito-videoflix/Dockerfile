FROM node:16

WORKDIR /usr/src/videoflix

COPY package*.json ./
RUN yarn

COPY . . 

RUN yarn build
RUN yarn prisma generate

EXPOSE 5050
