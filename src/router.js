// Express
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.send('Hello World from the REST api!')
})

app.get('/ttn',function (req,res){
    res.send('Hello from ttn')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
