/// <reference path="typings/_all.ts" />

module Treefort {
    'use strict';

    var app = angular.module("Treefort", ["ngRoute", "firebase"])
        .controller('FrontpageController', FrontpageController.prototype.injection())
        .service('PostIO', PostIO.prototype.injection());

    app.config(function ($routeProvider : ng.route.IRouteProvider) {
        $routeProvider
        .when("/", {
                templateUrl: "Views/Frontpage.html",
                controller: "FrontpageController"
            })
        .otherwise({
            templateUrl: "Views/404.html"
        });
    });
}