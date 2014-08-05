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
            $scope.deletePost = (i) => this.deletePost(i);
            $scope.startPostEdit = (p) => this.startPostEdit(p);
            $scope.finishPostEdit = (p) => this.finishPostEdit(p);

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

        startPostEdit(postVM: PostVM): void {
            this.$log.info("editing post with id of " + postVM.Id);
            postVM.Editing = true;
        }

        finishPostEdit(postVM: PostVM): void {
            postVM.PublishingEdit = true;

            this.PostIO.updatePost(postVM, (post, error) => {
                if (error)
                    this.onError(error);

                postVM.Editing = false;
                postVM.PublishingEdit = false;
            });
            
        }

        deletePost(viewIndex: number): void {
            var post: PostVM = this.$scope.posts[viewIndex];
            this.$log.info("Deleting post with id of " + post.Id);
            this.PostIO.deletePost(post,
                (e) => this.onDeletedPost(viewIndex, e));
        }

        onDeletedPost(viewIndex: number, error: any): void {
            if (error) 
                this.onError(error);
            else
                this.$scope.posts.splice(viewIndex, 1);
        }

        onPublished(post: Post, error: any) {
            this.$scope.publishing = false;
            this.$scope.newPostContent = "";
            
            if (post)
                this.$scope.posts.unshift( new PostVM(post) );

            if (error)
                this.onError(error);
        }

        getPosts(): void {
            this.PostIO.getPosts(20,
                (p) => this.onPosts(p), () => this.onError());
        }

        onPosts(posts: Post[]): void {
            var postVMs: PostVM[] = [];

            //create the postVMs, also reverse the order so newest is at top
            posts.reverse().forEach((p) => {
                postVMs.push(new PostVM(p));
            });

            this.$scope.posts = postVMs;
        }

        onError(Error?: any): void {
            if (Error)
                this.$scope.error = Error.toString();
            else
                this.$scope.error = "An error occured, try refreshing the page.";
        }
    }
}