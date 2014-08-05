module Treefort {
    'use strict';

    export class User {
        constructor(
            public Id: string,
            public FirstName: string,
            public LastName: string,
            public DateJoined: Date
            ) { }
    }
}