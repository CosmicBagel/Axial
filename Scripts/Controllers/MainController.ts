module Treefort {
    'use strict';

    export class MainController {
        public injection(): any[] {
            return [
                "$scope",
                "$interval",
                MainController
            ];
        }

        constructor(
            private $scope: ITreefortScope,
            private $timeout: ng.ITimeoutService) {

            //wait for some UI elments to load before we kick off
            $scope.onNoticeLoaded = () => {
                $scope.showNotice = false;
                this.checkIfNewUser();
            };
        }

        checkIfNewUser(): void {
            if (localStorage.getItem("visited") != "true") {
                localStorage.setItem("visited", "true");
                this.$scope.showNotice = true;
            }
        }
    }
}