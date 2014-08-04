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

        getPosts( maxCount: number, onSucess: (posts: Post[]) => void, onFailure: (Error?: any) => void) {
            var postsQuery = this.postsRoot.limit(maxCount);

            //we'll preapare the data instead of just passing the dataSnapshot back
            postsQuery.once("value", (dataSnapshot: IFirebaseDataSnapshot) => {
                try {
                    var posts: Post[] = [];
                    dataSnapshot.forEach(p => {
                        posts.push({
                            Id: p.name(),
                            Content: this.$sce.trustAsHtml(p.child("Content").val()),
                            AuthorId: p.child("AuthorId").val()
                        });
                        return false;
                    });
                    
                }
                catch (Error)
                {
                    onFailure(Error);
                    this.$rootScope.$digest();
                }

                //triggering digest since scope will be updated 
                //by the controller using this service
                onSucess(posts);
                this.$rootScope.$digest();
            }, () => {
                onFailure();
                this.$rootScope.$digest();
            });
        }
    }
} 