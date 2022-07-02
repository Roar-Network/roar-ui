import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { UserComponent } from './pages/user/user.component';

// ? Get username logged in
const token = window.localStorage.getItem("token");
// ? Get main component to / and * path
const mainComponent = token == "" || token == null ? HomeComponent : PostFeedComponent;

const lockRoutes = (c: any) => {
  return token == "" || token == null ? HomeComponent : c;
};

const routes: Routes = [
  {path: "", component: mainComponent}, 
  {path: "*", component: mainComponent},
  {path: "postfeed", component: lockRoutes(PostFeedComponent)},
  {path: "user/:alias", component: lockRoutes(UserComponent)},
  {path: "404", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
