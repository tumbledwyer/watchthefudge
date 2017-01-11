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
    addWatch({ name: "Swatch Classic", price: 500, warranty: 1 })
        .then(addWatch({ name: "Swatch Sport", price: 1500, warranty: 3 }))
        .then(addWatch({ name: "Rolex Gold", price: 10000, warranty: 3 }))
        .then(res.send("hello"));
});

app.post("/search", function (req, res) {
    search("watches", {
        query: createSearchQuery(req)
    }).then(function (result) {
        var hits = result.hits.hits;
        var watches = hits.map(function (hit) {
            return hit._source;
        });
        res.send(watches);
    })
});

function createSearchQuery(req) {
    return {
        "bool": {
            "must": {
                "query_string": {
                    query: req.body.searchText || "*"
                },             
            },    
            filter: {
                "range": {
                    "price": {                        
                        "lte": req.body.priceMax
                    }
                }
            }
        }
    }
}

function addWatch(watch) {
    return esClient.index({
        index: "watches",
        type: "watch",
        body: watch
    });
}

app.listen(9999);