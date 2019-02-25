# bug-api

## Running
```
npm install
npm start
```
De client.js zal subscriben op de TTN topic, daarna wordt de data verwerkt en doorgestuurd naar de game topic in een JSON object.

## Running in docker
```
docker build -t vives-projectwerk2-2019/bug-api .
docker run -p 8080:8080 vives-projectwerk2-2019/bug-api
```
The `-p` flag can be set to `customPort:8080`, `-d` will detatch the container from your shell.
