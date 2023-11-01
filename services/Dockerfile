FROM node:18
WORKDIR . .
COPY package*.json index.js ./
RUN npm install
EXPOSE 9000
CMD [ "npm", "start" ]