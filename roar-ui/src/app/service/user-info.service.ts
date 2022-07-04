import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../tools/user-info';
import { Post } from '../tools/post';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(public http: HttpClient) { }

  getFollowers(alias: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/followers`, {responseType:"json", headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")})
  }
  getFollowings(alias: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/followings`, {responseType:"json", headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")})
  }
  getPosts(alias: string): Observable<Post[]>{
    return this.http.get<Post[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/posts`, {responseType:"json", headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")})
  }
  getShares(alias: string): Observable<Post[]>{
    return this.http.get<Post[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/shares`, {responseType:"json", headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")})
  }
  getLikes(alias: string): Observable<Post[]>{
    return this.http.get<Post[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/likes`, {responseType:"json", headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")})
  }
  getFeed(): Observable<Post[]>{
    return this.http.get<Post[]>(`http://${environment.IP}:${environment.port}/me/feed`, {responseType:"json", headers: new HttpHeaders().set("Authorization", localStorage.getItem("token") || "")})
  }
}
