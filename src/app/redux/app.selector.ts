import { createFeatureSelector } from '@ngrx/store';

export const selectPokemons =
  createFeatureSelector<ReadonlyArray<any>>('pokemons');

  export const ownPokedex =
  createFeatureSelector<ReadonlyArray<any>>('ownPokedex');

