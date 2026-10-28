import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  // myHeaders: object = {
  //   headers: {
  //     authorization: `Bearer ${localStorage.getItem('socialToken')}`,
  //   },
  // };
  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signup`, data);
  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signin`, data);
  }
  changPass(data: object): Observable<any> {
    return this.httpClient.patch(`${environment.baseUrl}/users/change-password`, data);
  }
  logout() {
    localStorage.removeItem('socialToken');
    localStorage.removeItem('socialUser');

    this.router.navigate(['/login']);
  }
  getMyProfile(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data`);
  }
  getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/profile`);
  }
  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`);
  }
  GetFollowSuggestions(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=10`);
  }
  getBookmarks(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks`);
  }
}
