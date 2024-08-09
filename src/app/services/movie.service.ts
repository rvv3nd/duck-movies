import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { envairoment } from '../../enviroments/envairoments'

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private baseURL = envairoment.baseURL;
  private apiKey = envairoment.apiAccess;
  private headers = {
    accept: 'application/json',
    Authorization: `Bearer ${this.apiKey}`,
  };
  constructor(
    private http:HttpClient,
  ) { }

  /*
  Este método puede obtener las películas de una categoría y page específica.
  */
  getMoviesList(category: string, page: number): Observable<any> {
    const url = `${this.baseURL}/movie/${category}?include_adult=false&language=en-US&page=${page}`;
    return this.http.get(url, { headers: this.headers });
  }

  getMovieById(id: number): Observable<any> {
    const url = `${this.baseURL}/movie/${id}`;
    return this.http.get(url, { headers: this.headers });
  }
  
}
