module Treefort {
    'use strict';

    export class Post {
        constructor(
            public Id: string,
            public Content: string,
            public AuthorId: string
            ) { }
    }
} 