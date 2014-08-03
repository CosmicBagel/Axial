/// <reference path="../typings/_all.ts" />

module Treefort {
    class PostIO {

    }

    var ngModule = angular.module("githubViewer");
    ngModule.factory("PostIO", ["$firebase", PostIO]);
} 