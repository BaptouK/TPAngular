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
    return this.http.get<ApiResponse<Article[]>>('http://localhost:3000/articles');
  }

  public getArticle(id : number) : Observable<ApiResponse<Article>> {
    return this.http.get<ApiResponse<Article>>('http://localhost:3000/articles/'+id);
  }

  public deleteArticle(id : number) : Observable<void> {
    return this.http.delete<void>('http://localhost:3000/articles/'+id);
  }

  public createArticle(article : Article) : Observable<ApiResponse<Article>> {
    console.log(article);
    return this.http.post<ApiResponse<Article>>('http://localhost:3000/articles/save', article);
  }

}
