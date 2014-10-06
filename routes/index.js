var express = require('express');
var router = express.Router();
var scraper = require('webScraper');

var cheerio = require('cheerio');
var request = require('request');
var Q = require('q');

router.get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
});

router.get('/scrape', function (req, res) {

    if (req.query.function) {
        if (req.query.function.length !== 0) {
            eval("var crawlModule = " + req.query.function);
        } else {
            var crawlModule = null;
        }
    } else {
        var crawlModule = null;
    }
    
    scraper.crawlForData(req.query.url,
        req.query.class,
        function (data) {
            //don't know why but angular throws error if I send an array
            res.send({
                data: data
            });
        },
        crawlModule
    )
});

router.get('*', function (req, res) {
    res.render('index');
});
module.exports = router;

//eval("var c = function (elem) {var $ = cheerio.load(elem);var deferred = Q.defer();var link = $(elem).find('a').attr('href');var content = $(elem).text().replace(/\s{2,9999}/g, ' ').trim();var temp = {link: link,content: content};if (temp.link) {deferred.resolve(temp)} else {deferred.resolve(null)};return deferred.promise;};");