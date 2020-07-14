import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http"
import {map}  from "rxjs/Operators"
import { PortalHostDirective } from '@angular/cdk/portal';
import { Router } from '@angular/router';
// import { type } from 'os';
@Injectable({providedIn:"root"})
export class PostsService{
  private posts: Post[]=[];
  private postsUpdate = new Subject<Post[]>();

  constructor (private http:HttpClient,private router:Router) {  }

  getPosts(){
    this.http.get<{message: string,posts:any}>("http://localhost:3000/api/posts")
    .pipe(map((postData)=>{
        return postData.posts.map( post =>{
          return {
            title:post.title,
            content:post.content,
            id:post._id,
            imagePath:post.imagePath
          };
        });
    }))
    .subscribe((transformPost) =>{
        this.posts=transformPost;
        this.postsUpdate.next([...this.posts]);
    });
  }
  getPostUpdateListner(){
    return this.postsUpdate.asObservable();
  }
  getpost(id:string){
    // return {...this.posts.find(p => p.id===id)};
    return this.http.get<{ _id:string,title:string,content:string,imagePath:string}>("http://localhost:3000/api/posts/"+id)
  }

  addPost(title:string,content:string,image:File){
    // const post: Post={ id:null,title:title, content:content}
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image,title);
    this.http.post<{ message:string,post:Post}>("http://localhost:3000/api/posts",postData)
    .subscribe( responsedata =>{
      const post:Post ={
        id:responsedata.post.id,
        title:title,
        content:content,
        imagePath:responsedata.post.imagePath
      }
      console.log(responsedata.message);
      const id= responsedata.post.id;
      post.id=id;
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }
  updatePost(id:string,title:string,content:string,image: File | string){
    // const post:Post= { id: id,
    //   title:title,
    //   content:  content,
    //   imagePath: null
    // };
    let postData:Post| FormData;
    if(typeof(image)==='object'){
       postData= new FormData();
      postData.append('id',id);
      postData.append('title',title);
      postData.append('content',content);
      postData.append('image',image,title);
    }
    else{
         postData= {
          id:id,
          title:title,
          content:content,
          imagePath:image
        }
    }
    this.http.put("http://localhost:3000/api/posts/"+ id,postData)
    .subscribe(response=>{
        const updatedPosts=[...this.posts]
        const oldPostIndex=updatedPosts.findIndex(p => p.id===id)
        const post:Post={
          id:id,
          title:title,
          content:content,
          imagePath:""
        }
        updatedPosts[oldPostIndex]=post;
        this.posts=updatedPosts;
        this.postsUpdate.next([...this.posts]) ;
        this.router.navigate(["/"]);
        // console.log(response)
      });
  }
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+postId)
    .subscribe(()=>{
      const updatePost= this.posts.filter(post => post.id!= postId);
      this.posts=updatePost;
      this.postsUpdate.next([...this.posts]);
    });
  }

}
