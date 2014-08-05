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

            PostIO.getPosts(20,
                (p) => this.onPosts(p), () => this.onError());
        }

        publish(content: string): void {
            this.$scope.publishing = true;

            this.PostIO.createPost(
                { Id: "", Content: content, AuthorId: "5" },
                (p, e) => this.onPublished(p, e));
        }

        deletePost(id: string): void {
            this.$log.info("Deleting post with id of " + id);
            this.PostIO.deletePost(id, (e) => this.onDeletedPost(id, e));
        }

        onDeletedPost(id: string, error?: any): void {
            if (error) 
                this.onError(error);

            var indexToRemove = 0;
            this.$scope.posts.forEach((post, index) => {
                if (post.Id == id)
                    indexToRemove = index;
            });

            this.$scope.posts.splice(indexToRemove, 1);
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