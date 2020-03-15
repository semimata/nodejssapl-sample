FROM centos:centos7
#FROM node:10

ENV NODE_VERSION 10.15.1
ENV APP_ROOT /usr/src/app

WORKDIR ${APP_ROOT}
#RUN npm install && npm cache clean
RUN npm install 
COPY package.json .

COPY . ${APP_ROOT}
EXPOSE 3000
#CMD ["npm", "start"]
CMD ["node", "index.js"]

