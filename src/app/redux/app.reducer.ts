import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { pokedexApiActions } from './actions/pokedex-api.action';
import { ownPokedexAction } from './actions/own-pokedex.action';

import { PokedexApp } from './app.state';

export const pokedexReducer = createReducer(
  [],
  on(pokedexApiActions.setPage, (state, { pokemons }) => {
    return [...pokemons];
  }),

);

export const ownPokedexReducer = createReducer(
  [],
  on(ownPokedexAction.setPage, (state, { ownPokedex }) => {
    return [...ownPokedex];
  }),
  on(ownPokedexAction.addPokemon, (state, { pokemonName }) => {
    if (!state.find((entry) => entry.name == pokemonName)) {
      return [...state, { name: pokemonName }];
    }
    return [...state];
  }),
  on(ownPokedexAction.removePokemon, (state, { pokemonName }) => {
    return [...state].filter((entry) => entry.name != pokemonName);
  })
);
