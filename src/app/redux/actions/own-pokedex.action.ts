import { createAction, props } from '@ngrx/store';

export const ownPokedexAction = {
  page: createAction('ownPokedex/page', props<{ config?: any }>()),
  addPokemon: createAction(
    'ownPokedex/addPokemon',
    props<{ pokemonName: string }>()
  ),
  removePokemon: createAction(
    'ownPokedex/removePokemon',
    props<{ pokemonName: string }>()
  ),
  setPage: createAction(
    'ownPokedex/setPage',
    props<{ ownPokedex: Array<any> }>()
  ),
};
