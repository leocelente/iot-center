FROM node:latest
WORKDIR /app
COPY client/dist /app/views
COPY package.json /app
RUN npm install
RUN ls views
COPY index.js /app 
