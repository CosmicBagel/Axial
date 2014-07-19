/// <reference path="Scripts/typings/angularfire/angularfire.d.ts" />
/// <reference path="Scripts/typings/firebase/firebase.d.ts" />
/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />

function toggleNotice(show: boolean) {
    var overlay = $(".overlay");
    var modal = $(".modal");
    var options: any = {
        duration: 400,
    };

    show ? overlay.fadeIn(options) : overlay.fadeOut(options);
    show ? modal.fadeIn(options) : modal.fadeOut(options);
}



class Config {
    static FirebaseUrl: string = 'https://sweltering-fire-219.firebaseio.com/';
}


//the root class for treefort that starts it all up
class Treefort {
    fbRoot: Firebase;
    postIO: PostIO;
    sections: JQuery;

    Initalize() {
        this.fbRoot = new Firebase(Config.FirebaseUrl);
        this.postIO = new PostIO(this.fbRoot);
        this.sections = $("section");

        this.DisplayFrontpage();
    }

    DisplayFrontpage() {
        var frontpage: HTMLElement = this.sections.filter("#frontpage")[0];
        
        this.postIO.ReadPostsByCount(20, posts => {
            var frontpageHtml: string = "<ul>";
            posts.reverse();
            posts.forEach( p => {
                frontpageHtml +=
                "<li>" +
                    "<ul>" +
                        "<li>Id: " + p.Id + "</li>" +
                        "<li>AuthorId: " + p.AuthorId + "</li>" +
                        "<li>Content: " + p.Content + "</li>" +
                    "</ul>"+
                "</li>";
            });
            frontpageHtml += "</ul>";

            frontpage.innerHTML += frontpageHtml;
            $(frontpage).fadeIn();
        });

        //this.postIO.CreatePost({ Content: "I just made this hot and juicy post", AuthorId: 5, Id: "zzz" });
    }
}

class PostIO {
    postsRoot: Firebase;

    constructor(fbRoot: Firebase) {
        this.postsRoot = fbRoot.child("posts");
    }

    //returns string id of created post
    CreatePost(content: string, author: User): string {
        var hotAndFreshId:string = "fjdfhjdk";
        this.postsRoot.push({ Content: content, AuthorId: author.Id });

        return hotAndFreshId;
    }

    ReadPostsByCount(numberOfPosts: number, callback: (posts: Post[]) => any){
        var postQuery = this.postsRoot. limit(numberOfPosts); 
        
        postQuery.once("value", (dataSnapshot: IFirebaseDataSnapshot) => { 
            var posts: Post[] = [];
            dataSnapshot.forEach (p => {
                posts.push({
                    Id: p.name(),
                    Content: p.child("Content").val(),
                    AuthorId: p.child("AuthorId").val()
                });

                return false;
            });

            callback(posts);
        });
    }

    ReadPostById(id: string): Post {
        return { Id: "zzz", Content: "BAD READ", AuthorId: -1 };
    }

    UpdatePostById(post: Post) {}

    DeletePostById(post: Post) {}
}

class User {
    Id: string;
    FirstName: string;
    LastName: string;
    DateJoined: Date;
}

class Post {
    Id: string;
    Content: string;
    AuthorId: number;
}

window.onload = () => {
    if (localStorage.getItem("visited") != "true") {
        localStorage.setItem("visited", "true");
        toggleNotice(true);
    }

    var treefort: Treefort = new Treefort();
    treefort.Initalize();
};