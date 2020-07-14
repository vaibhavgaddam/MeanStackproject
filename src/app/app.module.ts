import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsCreateComponent } from "./posts/post-create/posts-create.component";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import{ MatToolbarModule } from "@angular/material/toolbar"
import { HeaderComponent } from "./header/header.component";
import{PostListComponent} from "./posts/post-list/post-list.component"
import { MatExpansionModule} from "@angular/material/expansion";
import{ HttpClientModule} from "@angular/common/http";
import{MatProgressSpinnerModule} from "@angular/material/progress-spinner"
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    PostsCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
