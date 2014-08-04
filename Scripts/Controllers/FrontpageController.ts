/// <reference path="../typings/_all.ts" />

module Treefort {
    'use strict';

    export class FrontpageController {

        public injection(): any[] {
            return [
                "$scope",
                "PostIO",
                FrontpageController
            ]
        }

        constructor(private $scope: ITreefortScope, PostIO: PostIO) {
            PostIO.getPosts(20, (p) => this.onPosts(p), () => this.onError());
        }

        onPosts(posts: Post[]) : void {
            this.$scope.posts = posts;
        }

        onError(Error?: any): void {
            this.$scope.error = "Could not fetch data";
        }
    }
}