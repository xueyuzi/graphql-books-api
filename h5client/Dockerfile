# Stage 1 - the build process
FROM node:8.10.0-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json  ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]