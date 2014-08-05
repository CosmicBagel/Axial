module Treefort {
    'use strict';

    export interface ITreefortScope extends ng.IScope {
        //data
        posts: Post[];
        error: string;
        newPostContent: string;

        //calls from view
        publish: Function;
        deletePost: Function;

        //state
        publishing: boolean;
    }
}