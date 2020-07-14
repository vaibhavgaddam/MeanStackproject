import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService  } from "../post.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls:['post-list.component.css']

})

export class PostListComponent implements OnInit , OnDestroy {
  post:Post[]=[];
  private  postsSub:Subscription;
  isLoading=false;
  constructor(public postService:PostsService) { }

  ngOnInit() {
    this.isLoading=true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListner()
      .subscribe((posts:Post[])=> {
        this.isLoading=false;
        this.post=posts;
      });
   }
   onDelete(postId:string){
     this.postService.deletePost(postId);
   }
   ngOnDestroy(){
     this.postsSub.unsubscribe();
   }
}
