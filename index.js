const express = require('express')
const app = express()
const fs = require("fs")

function readJsonFileSync(filepath, encoding) {
    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8'
    }
    let file = fs.readFileSync(filepath, encoding)
    return JSON.parse(file)
}

function getConfig(file) {
    var filepath = `${__dirname}/fakefiles/${file}`
    return readJsonFileSync(filepath)
}
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

// put json files in fakefiles folder and updated routes below.
app.get('/', (req, res) => res.send('Fake data here'))
app.get('/stations', (req, res) => res.json(getConfig('stations.json')))
app.get('/evt_data', (req, res) => res.json(getConfig('evt_data.json')))
app.get('/soe_data', (req, res) => res.json(getConfig('soe_data.json')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))