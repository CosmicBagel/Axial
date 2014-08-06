/// <reference path="typings/_all.ts" />

module Treefort {
    'use strict';

    var app = angular.module("Treefort", ["ngRoute", "ngSanitize", "ngAnimate"])
        .service("PostIO", PostIO.prototype.injection())
        .controller('MainController', MainController.prototype.injection())
        .controller('FrontpageController', FrontpageController.prototype.injection())
        ;        

    app.config(function ($routeProvider : ng.route.IRouteProvider) {
        $routeProvider
        .when("/", {
                templateUrl: "Views/Frontpage.html",
                controller: "FrontpageController"
        })
        .when("/account/create", {
            templateUrl: "Views/CreateAccount.html"
        })
        .when("/account", {
            templateUrl: "Views/Account.html"
        })
        .otherwise({
            templateUrl: "Views/404.html"
        });
    });
}