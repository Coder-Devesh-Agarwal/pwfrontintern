import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonStat } from './pokemon-detail.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  pokemonDetails: any;
  pokeColor: string;
  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('pokeId')) {
        //redirect
        return;
      }
      const pokeId = paramMap.get('pokeId');
      const fs1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
      const fs2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeId}.png`;
      const bs1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeId}.png`;
      const bs2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokeId}.png`;
      this.pokemonService.getPokemonStatId(pokeId).subscribe((pokeDetails) => {
        console.log(pokeDetails.types[0].type.name);
        const myColor = `${pokeDetails.types[0].type.name}`;
        this.pokeColor = myColor;
        this.pokemonDetails = {
          ...pokeDetails,
          images: [fs1, bs1, fs2, bs2],
        };
      });
    });
  }
}
