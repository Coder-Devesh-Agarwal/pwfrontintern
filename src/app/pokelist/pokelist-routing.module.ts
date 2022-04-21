import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokelistPage } from './pokelist.page';

const routes: Routes = [
  {
    path: '',
    component: PokelistPage,
  },
  {
    path: ':pokeId',
    loadChildren: () =>
      import('./pokemon-detail/pokemon-detail.module').then(
        (m) => m.PokemonDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokelistPageRoutingModule {}
