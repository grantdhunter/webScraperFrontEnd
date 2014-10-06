function homeCtrl($scope, $routeParams, scrapeData) {

    $scope.submit = function (scraper) {
        scrapeData.get({
            url: scraper.url,
            class: scraper.class,
            function: scraper.function
        }, function (data) {
            console.log(data);
            $scope.result = JSON.stringify(data.data, null, 2);
        });
    };

    $scope.codeExample = "function (elem) {\n\
    var $ = cheerio.load(elem);\n\
    var deferred = Q.defer();\n\
    \n\
    var link = $(elem).find('a').attr('href');\n\
    var content = $(elem).text().replace(/\s{2,9999}/g, ' ').trim();\n\
    var temp = {link: link,\n\
                content: content\n\
                };\n\
    if (temp.link) {\n\
        deferred.resolve(temp)\n\
    } else {\n\
        deferred.resolve(null)};\n\
    return deferred.promise;\n\
};"
}