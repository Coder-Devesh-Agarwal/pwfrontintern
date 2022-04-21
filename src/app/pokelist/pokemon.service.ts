import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { PokeResult } from './pokeResult.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  // private pokelist: PokemonItem[] = [
  //   {
  //     id: '4',
  //     title: 'Charmander',
  //     imageUrl:
  //       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  //   },
  // ];
  constructor(private http: HttpClient) {}
  // getPokemons() {
  //   return [...this.pokelist];
  // }
  getPokemons(start): Observable<any> {
    return this.http.get(this.apiUrl + `?offset=${start}&limit=20`);
  }
  getPokemonStatId(id): Observable<any> {
    return this.http.get(this.apiUrl + `${id}/`);
  }
}
