/// <reference path="../typings/_all.ts" />

module Treefort {
    'use strict';

    export class PostIO {
        firebaseUrl: string = 'https://sweltering-fire-219.firebaseio.com/';
        fbRoot: Firebase;
        postsRoot: Firebase;

        public injection(): any[] {
            return [
                "$rootScope",
                "$sce",
                PostIO
            ]
        }

        constructor(private $rootScope: ng.IRootScopeService, private $sce: ng.ISCEService) {
            this.fbRoot = new Firebase(this.firebaseUrl);
            this.postsRoot = this.fbRoot.child("posts");
        }

        getPosts(maxCount: number, onSucess: (posts: Post[]) => void,
            onFailure: (Error?: any) => void) {

            var postsQuery = this.postsRoot.limit(maxCount);

            //we'll preapare the data instead of just passing the dataSnapshot back
            try {
                postsQuery.once(
                    "value",
                    (dataSnapshot: IFirebaseDataSnapshot) => {
                        var posts: Post[] = [];
                        dataSnapshot.forEach(p => {
                            posts.push({
                                Id: p.name(),
                                Content: this.$sce.trustAsHtml(p.child("Content").val()),
                                AuthorId: p.child("AuthorId").val()
                            });
                            return false;
                        }
                    );

                    //triggering digest since scope will be updated 
                    //by the controller using this service
                    onSucess(posts);
                    this.$rootScope.$digest();
                    }, () => {
                        onFailure();
                        this.$rootScope.$digest();
                    }
                );
            }
            catch (error) {
                onFailure(error);
                this.$rootScope.$digest();
            }
        }

        createPost(post: Post, onComplete: (post: Post, error?: any) => void): void {
            try {
                var createdPost = this.postsRoot.push(
                    { Content: post.Content, AuthorId: post.AuthorId },
                    (e) => {
                        if (e || !createdPost)
                            throw "An error occured while creating a post: " + e;

                        onComplete({
                            Id: createdPost.name(),
                            Content: this.$sce.trustAsHtml(post.Content),
                            AuthorId: post.AuthorId
                        });
                        this.$rootScope.$digest();
                    });
            }
            catch (error) {
                onComplete(null, error);
                this.$rootScope.$digest();
            }
        }

        deletePost(post: Post, onComplete: (post?: Post, error?: any) => void): void {
            try {
                this.postsRoot.child(post.Id).remove((e) => {
                    if (e)
                        throw "An error occured: " + e;

                    onComplete(post);
                    this.$rootScope.$digest();
                });
            }
            catch (error) {
                onComplete(null, error);
                this.$rootScope.$digest();
            }
        }

        updatePost(post: Post, onComplete: (post?: Post, error?: any) => void): void {
            try {
                this.postsRoot.child(post.Id).set(post, (e) => {
                    if (e)
                        throw "An erro occured while editing a post: " + e;

                    onComplete(post);
                    this.$rootScope.$digest();
                });
            }
            catch (error) {
                onComplete(null, error);
                this.$rootScope.$digest();
            }
        }
    }
} 