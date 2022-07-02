import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from "@angular/material/button";
import {  MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatCardModule } from "@angular/material/card";
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { ProfileComponent } from './tools/profile/profile.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostComponent } from './tools/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './tools/category/category.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserComponent } from './pages/user/user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonPostComponent } from './tools/button-post/button-post.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { UserItemComponent } from './tools/user-item/user-item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    PostComponent,
    CategoryComponent,
    UserComponent,
    ButtonPostComponent,
    UserItemComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatTooltipModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
