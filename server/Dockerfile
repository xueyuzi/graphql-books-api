FROM node:8.10.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install pm2 -g --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org
ENV PM2_PUBLIC_KEY 5o28cn0ikfxbu6p
ENV PM2_SECRET_KEY p241uioo2ncc54h
COPY . .
CMD ["pm2-runtime", "./index.js"]
