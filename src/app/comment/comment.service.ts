import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentpayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Commentpayload[]>{
    return this.http.get<Commentpayload[]>('http://localhost:8080/api/comments/by-post/' + postId);
  }

  postComment(commentPayload: Commentpayload): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.http.get<Commentpayload[]>('http://localhost:8080/api/comments/by-user/' + name);
  }

}
