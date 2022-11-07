FROM node:16

WORKDIR /usr/src/videoflix-authentication

COPY package*.json ./
RUN yarn

COPY . . 

RUN yarn build
RUN yarn prisma generate

EXPOSE 5051
