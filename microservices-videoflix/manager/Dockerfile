FROM node:16

WORKDIR /usr/src/videoflix-manager

COPY package*.json ./
RUN yarn

COPY . . 

RUN yarn build
RUN yarn prisma generate

EXPOSE 5053
