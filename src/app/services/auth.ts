import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class serviceAuth {

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string) {
    return this.http.post('http://localhost:3000/login', {email, password});
  }

  public signup(email: string, password: string, passwordConfirm: string, pseudo: string, cityCode: string, city: string, phone: string
  ) {
    return this.http.post('http://localhost:3000/signup', {
      email, password, passwordConfirm, pseudo,
      cityCode, city, phone
    });
  }

  public check(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token non disponible');
      return throwError(() => new Error('Token non disponible'));
    }

    // Crée les en-têtes avec le token Bearer
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Envoie la requête GET avec les en-têtes et analyse la réponse
    return this.http.get('http://localhost:3000/check', { headers }).pipe(
      tap((response: any) => {
        console.log('Réponse de l\'API :', response);
      }),
      map((response: any) => {
        // Vérifie le message de la réponse de l'API
        return response.message === "Vous êtes toujours connecté(e)"; // Retourne true si l'utilisateur est connecté
      }),
      catchError((error) => {
        console.error('Erreur lors de la vérification de l\'authentification :', error);
        return throwError(() => new Error('Erreur lors de la vérification de l\'authentification'));
      })
    );
  }

}
