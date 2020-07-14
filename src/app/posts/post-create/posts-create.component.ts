
import { Component, OnInit } from '@angular/core';
import { Post} from '../post.model';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from '../post.service';
import { ActivatedRoute,Params, ParamMap } from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-posts-create',
  templateUrl: 'posts-create.component.html',
  styleUrls:['posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  enteredTitle="";
  enteredContent="";
  post:Post;
  imagePreview:string;
  private mode="create";
  private postId:string;
   isLoading=false;
   form:FormGroup;
    constructor(public postsService:PostsService, public route:ActivatedRoute) {

  }

  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode==='create'){
    this.postsService.addPost(
      this.form.value.title,
      this.form.value.content,
      this.form.value.image);
    }
    else{
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
        );
    }
    this.form.reset();
  }
  onImagePicked(event:Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity;
    const reader=new FileReader();
    reader.onload = () =>{
      this.imagePreview= reader.result as string;
    }
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.form);
  }


  ngOnInit() {
    this.form=new FormGroup({
      'title': new FormControl(null,{
        validators:[Validators.required,Validators.minLength(3)]}),
        'content':new FormControl(null, { validators:[Validators.required]}),
        image:new FormControl(null, {validators:[Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap :ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId=paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getpost(this.postId).subscribe(postData =>{
          this.isLoading=false;
          this.post ={ id:postData._id,
            title:postData.title,
            content:postData.content,
            imagePath:postData.imagePath
          }
          this.form.setValue({
            title:this.post.title,
            content:this.post.content,
            image:this.post.imagePath
          });
        });
      }
      else{
        this.mode="create";
        this.postId=null;
      }
    });
   }
}

