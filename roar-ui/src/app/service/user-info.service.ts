import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../tools/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(public http: HttpClient) { }

  getFollowers(alias: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/followers`, {responseType:"json"})
  }
  getFollowings(alias: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`http://${environment.IP}:${environment.port}/${encodeURIComponent(alias)}/followings`, {responseType:"json"})
  }
}
