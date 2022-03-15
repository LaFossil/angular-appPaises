import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
//import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  //como esto es una clase puedo crear un getter,
  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,cca2,flags,population');
  } 

  constructor( private http: HttpClient ) { } //consumimos el http

  buscarPais( termino: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${ termino }`;
    return this.http.get<Country[]>(url, { params: this.httpParams }); //Retorna un observable

    /* Si quisieramos controlar los errores al hacer la llamada con operador rxjs, 
    tendriamos que importar arriba:    import {catchError} from 'rxjs/operators';
    of es una función que genera observables, el cual transforma lo que pongamos en los paréntesis en un nuevo observable.
      return this.http.get(url).pipe(
      catchError(err => of([]))
    );  */
  }

  buscarCapital ( termino: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ termino }`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorAlpha ( id: string ): Observable<Country[]>{
    const url = `${this.apiUrl}/alpha/${ id }`;
    return this.http.get<Country[]>(url);
  }

  buscarRegion ( region: string): Observable<Country[]>{
    //v2 const url = `https://restcountries.com/v2/regionalbloc/${ region }`;
    //v3 antes de filtro: const url = `${this.apiUrl}/region/${ region }`; 
    //con filtro: const url = `${this.apiUrl}/region/${ region }?fields=name,capital,cca2,flags,population`;
    //uso del tap para ver respuesta, return this.http.get<Country[]>(url).pipe( tap(console.log))
    //const params = new HttpParams().set('fields', 'name,capital,cca2,flags,population');

    const url = `${this.apiUrl}/region/${ region }`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
}
