import {Component, OnInit} from '@angular/core';
import {Article} from '../model/article.model';
import {ArticleService} from '../services/article-service';
import {HttpClientModule} from '@angular/common/http';

declare const UIkit: any;

@Component({
  selector: 'app-article',
  imports: [HttpClientModule],
  templateUrl: './article.html',
  styleUrl: './article.scss'
})

export class Articles implements OnInit{
  article : Article[] = [];

  isLoading = false;
  error : string | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.error = null;
    this.articleService.getArticles().subscribe({
      next: (response) => {
        this.article = response.data;
        console.log("article : ",this.article);
        console.log("article : ",this.article);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Impossible de charger les articles.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

}
