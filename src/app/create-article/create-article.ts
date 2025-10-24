import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Article} from '../model/article.model';
import {ArticleService} from '../services/article-service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-article.html',
  styleUrls: ['./create-article.scss'],
})
export class CreateArticle {
  ArticleForm: FormGroup;
  submittedData: any = null;

  article = new Article;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.ArticleForm = this.fb.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      author: ['', [Validators.required]],
      imgPath: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log("Form submitted");
    if (this.ArticleForm.valid) {
      console.log("Form 2");

      this.article.id = "id";
      this.article.title = this.ArticleForm.value.title;
      this.article.desc = this.ArticleForm.value.desc;
      this.article.author = this.ArticleForm.value.author;
      this.article.imgPath = this.ArticleForm.value.imgPath;

      this.articleService.createArticle(this.article).subscribe(
        (response) => {
          console.log('Article créé avec succès :', response);
          this.submittedData = response; // Stockez la réponse du serveur
        },
        (erreur) => {
          console.error('Erreur lors de la création :', erreur);
        }
      );
    }
  }

}
