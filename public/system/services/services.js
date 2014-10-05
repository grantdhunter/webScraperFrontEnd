var scraperServices = angular.module('scraperServices', ['ngResource']);

scraperServices.factory('scrapeData',
    function ($resource) {
        return $resource('/scrape/', {}, {
            query: {
                method: 'GET',
                isArray:true,
                params: {
                    url: 'url',
                    class: 'class',
                    function: 'function'
                }
            }
        });
    });