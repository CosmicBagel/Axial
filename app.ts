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
    postUI: PostUI;
    sections: JQuery;

    Initalize() {
        this.fbRoot = new Firebase(Config.FirebaseUrl);
        this.postIO = new PostIO(this.fbRoot);
        this.postUI = new PostUI(this.postIO);
        this.sections = $("section");

        this.DisplayFrontpage();
    }

    DisplayFrontpage() {
        this.postIO.ReadPostsByCount(20, posts => {
            var frontpage: JQuery = $("section#frontpage");
            posts.forEach(p => {
                this.postUI.DisplayPost(null, p.Id, p.Content, p.AuthorId);
            });

            $(frontpage).fadeIn();
        });
    }
}

class PostUI {
    postIO: PostIO;

    constructor(postIO: PostIO) {
        this.postIO = postIO;
    }

    DeletePost(id: string) {
        console.log("postUI: deleting post");
        this.postIO.DeletePostById(id, (error: any)=> {
            if (error != null) {
                console.error("Post deletion error: " + error);
            } else {
                var postToRemove = $("ul[data-postid='" + id + "']").parent();
                postToRemove.fadeOut("200", () => {
                    postToRemove.remove();
                });
            }
        });
    }

    CreatePost() {
        var textarea = $("textarea[name='newPost']") 
        var content = textarea.val();

        console.log("creating post: " + content);
        var newId = this.postIO.CreatePost(content,
            { Id: "5", DateJoined: new Date("1991"), FirstName: "sam", LastName: "whiteley" },
            (error: any) => {
                this.DisplayPost(error, newId, content, "5");
                textarea.val("");
            });
    }

    StartPostEdit(id: string) {

    }

    FinishPostEdit(id: string, updatedContent: string) {

    }

    DisplayPost(error: any, id: string, content: string, authorId: string)
    {
        console.log("displaying post...");
        var postlist = $("ul[id='postList']").prepend(
            "<li>" +
                "<ul data-postid=\"" + id + "\">" +
                    "<li>Id: " + id + "</li>" +
                    "<li>AuthorId: " + authorId + "</li>" +
                    "<li>Content: " + content + "</li>" +
                    "<button onclick = 'treefort.postUI.DeletePost(\"" + id + "\")'>Delete</button >" +
                "</ul>" +
            "</li>"
        );
    }
}

class PostIO {
    postsRoot: Firebase;

    constructor(fbRoot: Firebase) {
        this.postsRoot = fbRoot.child("posts");
    }

    //returns string id of created post
    CreatePost(content: string, author: User, callback: (error:any) => void): string {
        var newPost = this.postsRoot.push({ Content: content, AuthorId: author.Id }, callback );

        var hotAndFreshId: string = newPost.name();

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

    UpdatePostById(post: Post) {
        console.log("post updated");
    }

    DeletePostById(id: string, callback: (error: any) => void) {
        this.postsRoot.child(id).remove(callback);
    }
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
    AuthorId: string;
}

var treefort : Treefort;
window.onload = () => {
    if (localStorage.getItem("visited") != "true") {
        localStorage.setItem("visited", "true");
        toggleNotice(true);
    }

    treefort = new Treefort();
    treefort.Initalize();
};