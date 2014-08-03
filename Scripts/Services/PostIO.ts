/// <reference path="../typings/_all.ts" />

module Treefort {
    'use strict';
    export class PostIO {
        public injection(): any[] {
            return [
                "$firebase",
                PostIO
            ]
        }

        constructor(private $firebase: AngularFire) { }
    }
} 