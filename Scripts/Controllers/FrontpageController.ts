/// <reference path="../typings/_all.ts" />

module Treefort {
    'use strict';

    export class FrontpageController {

        public injection(): any[] {
            return [
                "$scope",
                "PostIO",
                "$log",
                FrontpageController
            ]
        }

        constructor(
            private $scope: ITreefortScope,
            private PostIO: PostIO,
            private $log: ng.ILogService) {

            //wire up functions to be called from view
            $scope.publish = (c) => this.publish(c);
            $scope.deletePost = (id) => this.deletePost(id);

            //anon functions fix scoping issues 
            //eg. this.PostIO is undefined because function is being called from the class closure

            $scope.publishing = false;

            this.getPosts();
        }

        publish(content: string): void {
            this.$scope.publishing = true;

            this.PostIO.createPost(
                { Id: "", Content: content, AuthorId: "5" },
                (p, e) => this.onPublished(p, e));
        }

        deletePost(post: Post): void {
            this.$log.info("Deleting post with id of " + post.Id);
            this.PostIO.deletePost(post,
                (p, e) => this.onDeletedPost(p, e));
        }

        onDeletedPost(post?: Post, error?: any): void {
            if (error) 
                this.onError(error);

            if (post) {
                var indexToRemove = 0;
                this.$scope.posts.forEach((p, i) => {
                    if (p == post)
                        indexToRemove = i;
                });
                this.$scope.posts.splice(indexToRemove, 1);
            }
        }

        onPublished(post?: Post, error?: any) {
            this.$scope.publishing = false;
            this.$scope.newPostContent = "";

            if (post)
                this.$scope.posts.unshift(post);

            if (error)
                this.onError(error);
        }

        getPosts(): void {
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