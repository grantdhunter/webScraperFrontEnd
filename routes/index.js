var express = require('express');
var router = express.Router();
var scraper = require('./webScraper');

router.get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
});

router.get('/scrape', function (req, res) {
    console.log(req.query.url);
    console.log(req.query.class);
    scraper.crawlForData(req.query.url,
        req.query.class,
        function (data) {
            console.log(data);
        //don't know why but angular throws error if I send an array
            res.send({data:data});
        });
});

router.get('*', function (req, res) {
    res.render('index');
});
module.exports = router;