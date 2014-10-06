var express = require('express');
var router = express.Router();
var scraper = require('webScraper');


router.get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
});


router.get('*', function (req, res) {
    res.render('index');
});
module.exports = router;

//eval("var c = function (elem) {var $ = cheerio.load(elem);var deferred = Q.defer();var link = $(elem).find('a').attr('href');var content = $(elem).text().replace(/\s{2,9999}/g, ' ').trim();var temp = {link: link,content: content};if (temp.link) {deferred.resolve(temp)} else {deferred.resolve(null)};return deferred.promise;};");