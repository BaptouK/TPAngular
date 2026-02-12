import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Article} from '../model/article.model';
import {ApiResponse} from '../model/api-response.model';

@Injectable({
  providedIn: 'any'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  public getArticles() : Observable<ApiResponse<Article[]>>{
    return this.http.get<ApiResponse<Article[]>>('http://localhost:3000/getArticles');
  }

  public getArticle(id : string) : Observable<ApiResponse<Article>> {
    return this.http.get<ApiResponse<Article>>('http://localhost:3000/article/'+id);
  }

  public deleteArticle(id : string) : Observable<void> {
    return this.http.delete<void>('http://localhost:3000/deleteArticle/'+id);
  }

  public createArticle(article : Article) : Observable<ApiResponse<Article>> {
    console.log(article);
    return this.http.post<ApiResponse<Article>>('http://localhost:3000/createArticle', article);
  }

}
