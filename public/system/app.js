'use strict';


// Declare app level module which depends on filters, and services
var webApp = angular.module('webApp', ['ngRoute', 'scraperServices']);


$(startApp)

function startApp() {


    webApp.config(function ($provide, $routeProvider, $locationProvider) {

        //setup routes
        $routeProvider.when('/', {
            templateUrl: 'partials/home',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/home', {
            redirectTo: '/'
        });
       
        $locationProvider.html5Mode(true);
    });


    angular.bootstrap(document, ['webApp']);
}