import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsCreateComponent } from './posts/post-create/posts-create.component';


const routes: Routes = [
  { path: '',component:PostListComponent},
  { path:'create',component:PostsCreateComponent},
  {path:'edit/:postId',component:PostsCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
