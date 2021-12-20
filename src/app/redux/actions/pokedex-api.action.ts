import { createAction, props } from '@ngrx/store';
import { ConfigPageApi } from 'src/app/shared/config-page-api.model';

export const pokedexApiActions = {
  page: createAction('pokedexApi/page', props<{ config: ConfigPageApi }>()),
  getPokemon: createAction(
    'pokedexApi/getPokemon',
    props<{ name: string; onSuccess?: (...args) => void }>()
  ),
  setPage: createAction(
    'pokedexApi/setPage',
    props<{ pokemons: Array<any> }>()
  ),
};
