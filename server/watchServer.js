var express = require("express");
var elasticsearch = require("elasticsearch")
var bodyParser = require("body-parser");

var app = express();

var esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

var search = function (index, body) {
    return esClient.search({ index: index, body: body });
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requests-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.post("/init", function (req, res) {
    res.send("hello");   
 
});

app.listen(9999);