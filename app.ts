/// <reference path="Scripts/typings/angularfire/angularfire.d.ts" />
/// <reference path="Scripts/typings/firebase/firebase.d.ts" />
/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}

function toggleNotice(show: boolean) {
    var overlay = $(".overlay");
    var modal = $(".modal");
    var options: any = {
        duration: 400,
    };

    show ? overlay.fadeIn(options) : overlay.fadeOut(options);
    show ? modal.fadeIn(options) : modal.fadeOut(options);
}

window.onload = () => {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();

    if (localStorage.getItem("visited") != "true") {
        toggleNotice(true);
        localStorage.setItem("visited", "true");
    }
};