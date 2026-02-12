import {Component} from '@angular/core';
import {ArticleService} from '../services/article-service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-article-edit',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './article-edit.html',
  styleUrl: './article-edit.scss'
})
export class ArticleEdit {
  EditArticleForm: FormGroup;
  submittedData: any = null;
  private id!: string;
  article: any | undefined;

  constructor(
    private api: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private serviceArticle: ArticleService
  ) {
    this.EditArticleForm = this.fb.group({
      title: ['', []],
      desc: ['', []],
      author: ['', []],
      imgPath: ['', []],
    });
  }

  ngOnInit(): void {
    this.display();
  }

  public display() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.api.getArticle(String(this.id)).subscribe((data: any) => {
      this.article = data.data;
      // Initialise le formulaire avec les données de l'article
      this.EditArticleForm.patchValue({
        id : this.article.id,
        title: this.article.title,
        desc: this.article.desc,
        author: this.article.author,
        imgPath: this.article.imgPath,
      });
    });
  }

  onSubmit() {
    if (this.EditArticleForm.valid) {
      const updatedArticle = {
        id: this.id,
        ...this.EditArticleForm.value
      };
      this.serviceArticle.createArticle(updatedArticle).subscribe(
        (response) => {
          console.log('Article modifié avec succès :', response);
          this.submittedData = response;
          this.router.navigate(['/article']);
        },
        (erreur) => {
          console.error('Erreur lors de la modification :', erreur);
        }
      );
    }
  }
}
