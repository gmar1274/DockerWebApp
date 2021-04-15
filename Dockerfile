#Build image from latest version available from DockerHub
FROM node:latest as builder
# Bundle app source
COPY . /dockerapp/

# Create app directory
WORKDIR /dockerapp
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./dockerapp
RUN npm install
RUN $(npm bin)/ng build

FROM nginx
COPY --from=builder /dockerapp/dist* /usr/share/nginx/html/

EXPOSE 80

#CMD [ "node", "server.js" ]