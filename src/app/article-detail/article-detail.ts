import {Component, ChangeDetectionStrategy, inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, Event} from '@angular/router';
import {ArticleService} from '../services/article-service';
import {Article} from '../model/article.model';
import {HttpClientModule} from '@angular/common/http';
import {Articles} from '../article/article';
import {delay} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-article-detail',
  imports: [
    HttpClientModule
  ],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
})

export class ArticleDetail {

  constructor(private api: ArticleService, private route: ActivatedRoute, private router: Router) {

  }

  article: any | undefined;

  public display() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.api.getArticle(id).subscribe((data: any) => {
      this.article = data.data;

      console.log(this.article)
    });
  }

  public delete() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.api.deleteArticle(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
    this.display();
  }
}
