# bug-api

## Running
```
npm install
npm start
```
## client.js
De client.js zal subscriben op de ttn topic en de hardware topic zodat het 2 objecten krijgt van 2 verschillende topics, daarna wordt de data gevalideerd en doorgestuurd naar de game topic in een JSON object.

## controller.js
Een klasse voor de controller waarin verschillende soorten data worden opgeslagen. Het heeft ook een methode die de dongles opvraagt die aanwezig zijn op de controller.

## fetch.js
Hier maken we een connectie met de kiosk a.d.h.v http.

## game.js
Hier zal een publish gebeuren van het game object die de game nodig heeft. Dit bevat alle soorten data die nodig is voor de game.

## kiosk.js
Kiosk klasse met verschillende methodes die gebruikt wordt wanneer we een connectie maken met de kiosk via de fetch.js.

## Running in docker

```
docker build -t vives-projectwerk2-2019/bug-api .
docker run -p 8080:8080 vives-projectwerk2-2019/bug-api
```
The `-p` flag can be set to `customPort:8080`, `-d` will detatch the container from your shell.

## bug-jsonv
```
npm i bug-jsonv
´´´
Er wordt in dit project ook gebruik gemaakt van een npm package die ik zelf heb gemaakt. Die zal het ttndataobject gaan valideren vooraleer het wordt doorgestuurd naar de game. De package bevat ook een functionality die gebruikt kan worden voor de 'game' groep. 
Hier is de link: https://www.npmjs.com/package/bug-jsonv


