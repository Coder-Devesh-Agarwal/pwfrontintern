import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokemonItem } from './pokelist.model';
@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.page.html',
  styleUrls: ['./pokelist.page.scss'],
})
export class PokelistPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  offset = 0;
  pokelist: PokemonItem[] = [];
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    // this.pokemonService.getPokemons(0).subscribe((pokelist) => {
    //   console.log(pokelist.results);
    //   this.pokelist = pokelist.results.map((pokemon) => ({
    //     name: pokemon.name,
    //     url: pokemon.url,
    //     id: pokemon.url.slice(34, -1),
    //     imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.slice(
    //       34,
    //       -1
    //     )}.png`,
    //   }));
    // });
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 20;
    }

    this.pokemonService.getPokemons(this.offset).subscribe((pokelist) => {
      this.pokelist = [
        ...this.pokelist,
        ...pokelist.results.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
          id: pokemon.url.slice(34, -1),
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.slice(
            34,
            -1
          )}.png`,
        })),
      ];

      if (event) {
        event.target.complete();
      }

      // Control
      if (this.offset === 560) {
        this.infiniteScroll.disabled = true;
      }
    });
  }
  onSearchChange(e) {
    const value = e.detail.value;
    if (value === '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokemonService.getPokemonStatId(value).subscribe(
      (res) => {
        this.pokelist = [
          {
            ...res,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.id}.png`,
          },
        ];
      },
      (err) => {
        this.pokelist = [];
      }
    );
  }
}
