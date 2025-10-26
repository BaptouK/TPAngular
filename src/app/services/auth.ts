import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class serviceAuth {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  public checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.validateToken(token).subscribe({
        next: (isValid) => {
          console.log('Token validation result:', isValid);
          this.isAuthenticatedSubject.next(isValid);
        },
        error: () => this.isAuthenticatedSubject.next(false),
      });
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }


  private validateToken(token: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{ message: string }>('http://localhost:3000/check', { headers }).pipe(
      map((response) => {
        // Si le message est "Vous êtes toujours connecté(e)", le token est valide
        return response.message === "Vous êtes toujours connecté(e)";
      }),
      tap((isValid) => console.log('Token valide ?', isValid)), // Log pour déboguer
      catchError((error) => {
        console.error('Erreur lors de la validation du token:', error);
        return of(false); // En cas d'erreur, considère le token comme invalide
      })
    );
  }


  public logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }


  public login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { email, password }).pipe(
      tap((response: any) => {
        if (response.data) {
          localStorage.setItem('authToken', response.data);
          this.checkAuthStatus();
        }
      })
    );
  }


  public signup(email: string, password: string, passwordConfirm: string, pseudo: string, cityCode: string, city: string, phone: string
  ) {
    return this.http.post('http://localhost:3000/signup', {
      email, password, passwordConfirm, pseudo,
      cityCode, city, phone
    });
  }
}
