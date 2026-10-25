import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(page: number = 1): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts?page=${page}`);
  }
  creatPosts(body: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts`, body);
  }
  getSinglPost(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`);
  }
  deleteSinglPost(postId: any): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}`);
  }
  updateSinglPost(postId: any, body: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}`, body);
  }
  bookMarkPost(postId: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/bookmark`, {});
  }
}
