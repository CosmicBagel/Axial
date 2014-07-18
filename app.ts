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
        localStorage.setItem("visited", "true");
        toggleNotice(true);
    }





    //myRootRef.unauth();

    var treefort: Treefort = new Treefort();
    treefort.Initalize();
};

class Config {
    static FirebaseUrl: string = 'https://sweltering-fire-219.firebaseio.com/';
}


//the root class for treefort that starts it all up
class Treefort {
    fbRoot: Firebase;
    postIO: PostIO;
    controllers: Controller[];
    sections: JQuery;

    Initalize() {
        this.fbRoot = new Firebase(Config.FirebaseUrl);
        this.postIO = new PostIO(this.fbRoot);
        this.sections = $("section");
        


        // start controller for home page
        // 
        this.DisplayFrontpage();
    }

    //switch view to new controller (pass in type of controller)
    SwitchView(controller: Controller) {
        //fade out current sections
        this.sections.fadeOut();
    }

    DisplayFrontpage() {
        var frontpage: HTMLElement = this.sections.filter("#frontpage")[0];
        
        this.postIO.ReadPostsByCount(20, posts => {
            var frontpageHtml:string = "<ul>";
            posts.forEach( p => {
                frontpageHtml += "<li>" + p.Content + "</li>";
            });
            frontpageHtml += "</ul>";

            frontpage.innerHTML += frontpageHtml;
            $(frontpage).fadeIn();
        });
    }

    //fbRoot

    //UserAuth

    //

    //Post
    //User
    // 

    //CRUD for posts
    //PostStreamIO

    //Data models

    //posts
    //id
    //content
    //authorId

    //users
    //id
    //FirstName
    //LastName
    //DateJoined
}



class Controller {



}

class FrontPage extends Controller {
    Root() {

    }
}

class PostIO {
    postsRoot: Firebase;

    constructor(fbRoot: Firebase) {
        this.postsRoot = fbRoot.child("posts");
    }

    //returns id of created post
    CreatePost(post: Post): number {
        //this.fbRoot.set({
        //    content: "<a href='http://paperhatstudios.com'>First post!</a>",
        //    date: new Date().toUTCString()
        //});

        return 0;
    }

    ReadPostsByCount(numberOfPosts: number, callback: (posts: Post[]) => any){
        var postQuery = this.postsRoot.limit(numberOfPosts);
        
        postQuery.once("value", (dataSnapshot: IFirebaseDataSnapshot) => { 
            var posts: Post[] = [];
            dataSnapshot.forEach(p => {
                posts.push({
                    Id: -1,
                    Content: p.child("Content").val(),
                    AuthorId: p.child("AuthorId").val()
                });

                return false;
            });

            callback(posts);
        });
    }

    ReadPostById(id: string): Post {
        //this.fbRoot.child('content').on(
        //    'value',
        //    (snapshot) => alert(snapshot.val())
        //);

        return { Id: -1, Content: "BAD READ", AuthorId: -1 };
    }

    UpdatePostById(post: Post) {

    }

    DeletePostById(post: Post) {

    }

}

class User {
    Id: number;
    FirstName: string;
    LastName: string;
    DateJoined: Date;
}

class Post {
    public Id: number;
    Content: string;
    AuthorId: number;
}