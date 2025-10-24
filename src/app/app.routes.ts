import { Routes } from '@angular/router';
import {Articles} from './article/article';
import {Auth} from './auth/auth';
import {ArticleDetail} from './article-detail/article-detail';
import {Signup} from './signup/signup';
import {Home} from './home/home';
import {CreateArticle} from './create-article/create-article';
import {ArticleEdit} from './article-edit/article-edit';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'article', component: Articles},
  { path: 'create', component: CreateArticle},
  { path: 'article/:id', component: ArticleDetail },
  { path: 'article/edit/:id', component: ArticleEdit },
  { path: 'auth', component: Auth},
  { path: 'signup', component: Signup}
];
