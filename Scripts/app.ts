/// <reference path="typings/_all.ts" />

module Treefort {
    var app = angular.module("Treefort", ["ngRoute", "firebase"]);
    app.config(function ($routeProvider : ng.route.IRouteProvider) {
        $routeProvider
        .when("/frontpage", {
            templateUrl: "Views/Frontpage.html",
            controller: "FrontpageController"
        })
        .when("/", {
                templateUrl: "Views/Frontpage.html",
                controller: "FrontpageController"
            })
        .otherwise({
            templateUrl: "Views/404.html"
        });
    });
}