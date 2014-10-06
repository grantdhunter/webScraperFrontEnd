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

}