/// <reference path="../typings/_all.ts" />

module Treefort {
    'use strict';

    export class FrontpageController {
        public injection(): any[] {
            return [
                "$scope",
                "PostIO",
                FrontpageController
            ]
        }

        constructor(
            private $scope: ITreefortScope,
            private postIO: PostIO
        ) {
            
        }
    }
}