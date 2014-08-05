module Treefort {
    'use strict';

    export class PostVM extends Post {
        constructor(
            post: Post,
            public Editing: boolean = false,
            public PublishingEdit: boolean = false
            ) {
            super(post.Id, post.Content, post.AuthorId);
        }
    }
}  