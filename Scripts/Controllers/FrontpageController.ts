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

        constructor(private $scope: ITreefortScope, private PostIO: PostIO) {
            //wire up functions to be called from view
            $scope.publish = this.publish;

            PostIO.getPosts(20,
                (p) => this.onPosts(p), () => this.onError());
        }

        publish(content: string): void {
            this.PostIO.createPost(new Post("", content, "5"), this.onPublished);
        }

        onPublished(error?: any) {
            if (error)
                this.onError(error);
            else
                this.PostIO.getPosts(20,
                    (p) => this.onPosts(p), () => this.onError());
        }

        onPosts(posts: Post[]) : void {
            this.$scope.posts = posts.reverse();
        }

        onError(Error?: any): void {
            if (Error)
                this.$scope.error = Error;
            else
                this.$scope.error = "An error occured, try refreshing the page.";
        }
    }
}