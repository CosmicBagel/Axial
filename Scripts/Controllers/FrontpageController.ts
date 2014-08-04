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
            $scope.publish = (c) => this.publish(c);
            //anon functions fix scoping issues 
            //eg. this.PostIO is undefined because function is being called from the class closure

            $scope.publishing = false;

            PostIO.getPosts(20,
                (p) => this.onPosts(p), () => this.onError());
        }

        publish(content: string): void {
            this.$scope.publishing = true;

            this.PostIO.createPost(
                { Id: "", Content: content, AuthorId: "5" },
                (p, e) => this.onPublished(p, e));
        }

        onPublished(post?: Post, error?: any) {
            this.$scope.publishing = false;
            this.$scope.newPostContent = "";

            if (post)
                this.$scope.posts.unshift(post);

            if (error)
                this.onError(error);
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