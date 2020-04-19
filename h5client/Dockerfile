# Stage 1 - the build process
FROM node:8.10.0-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json  ./
RUN npm install
COPY . ./
CMD ["npm run start"]
