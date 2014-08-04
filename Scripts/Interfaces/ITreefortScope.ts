module Treefort {
    'use strict';

    export interface ITreefortScope extends ng.IScope {
        posts: Post[];
        error: string;
        newPostContent: string;

        publish: Function;
    }
}