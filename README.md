# bug-api

## Running
```
npm install
npm start
```
## Description
De client.js zal subscriben op de TTN topic en de hardware topic zodat het 2 objecten krijgt van 2 verschillende topics, daarna wordt de data gevalideerd en doorgestuurd naar de game topic in een JSON object.

## bug-jsonv
```
npm i bug-jsonv
´´´
Er wordt in dit project ook gebruik gemaakt van een npm package die ik zelf heb gemaakt. Die zal het ttndataobject gaan valideren vooraleer het wordt doorgestuurd naar de game. De package bevat ook een functionality die gebruikt kan worden voor de 'game' groep. 
Hier is de link: https://www.npmjs.com/package/bug-jsonv

## Running in docker
```
docker build -t vives-projectwerk2-2019/bug-api .
docker run -p 8080:8080 vives-projectwerk2-2019/bug-api
```
The `-p` flag can be set to `customPort:8080`, `-d` will detatch the container from your shell.
