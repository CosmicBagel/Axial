module Treefort {
    'use strict';

    export interface ITreefortScope extends ng.IScope {
        //data
        posts: PostVM[];
        error: string;
        newPostContent: string;

        //calls from view
        publish: Function;
        deletePost: Function;
        startPostEdit: Function;
        finishPostEdit: Function;
        onNoticeLoaded: Function;

        //state
        publishing: boolean;
        showNotice: boolean;
    }
}