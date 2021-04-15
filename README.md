# DockerWebApp
Here is my OpenLayers web app developed using the MEAN stack. I attempted to use Docker to orchestrate the deployment of this web app. I was not 100% successful. However, use the below code to start up the MySQL DB service. 

```console
docker-compose up
```

## Angular
Angular will run on port 4200.
```console
cd angualr-ui/
npm serve
```
## Node.js
Node.js using the Express framework will run on port 3080
```console
cd node-express/
nodemon server.js
```
