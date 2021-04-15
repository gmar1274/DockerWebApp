# DockerWebApp
Here is my OpenLayers web app developed using the MEAN stack. I attempted to use Docker to orchestrate the deployment of this web app. I was not 100% successful. However, use the below code to start up the MySQL DB and phpMyAdmin service. 

```console
docker-compose up
```
## MySQL
The MySQL server will run on port 3306.

## phpMyAdmin
I used phpMyAdmin to interface with the MySQL DB server.
This will run on port 8080

## Angular
Angular will run on port 4200.
```console
cd angualr-ui/
npm install
npm serve
```
## Node.js
Node.js using the Express framework will run on port 3080
```console
cd node-express/
npm install
nodemon server.js
```
