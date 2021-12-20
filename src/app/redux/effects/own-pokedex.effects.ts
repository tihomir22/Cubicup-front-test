import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { pokedexApiActions } from '../actions/pokedex-api.action';
import { HttpClient } from '@angular/common/http';
import { ConfigPageApi } from '../../shared/config-page-api.model';
import { ownPokedexAction } from '../actions/own-pokedex.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OwnPokedexEffects {
  pageOwnPokedex$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Array<any>>(ownPokedexAction.page),
      switchMap((action) => {
        return this.http.get(environment.API_LOCAL_LB4 + `pokemon`);
      }),
      switchMap((x) => {
        return [ownPokedexAction.setPage({ ownPokedex: x as any })];
      })
    )
  );

  putPokemonIntoOwnPokedex$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Array<any>>(ownPokedexAction.addPokemon),
      switchMap((action) => {
        return this.http.post(environment.API_LOCAL_LB4 + `pokemon`, {
          name: action.pokemonName,
        });
      }),
      switchMap((x) => {
        this.toastr.success('Añadido a la pokedex');
        return [ownPokedexAction.page({})];
      })
    )
  );

  removePokemonFromPokedex$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Array<any>>(ownPokedexAction.removePokemon),
      switchMap((action) => {
        return this.http.delete(
          environment.API_LOCAL_LB4 + `pokemon/` + action.pokemonName
        );
      }),
      switchMap((x) => {
        this.toastr.success('Eliminado de la pokedex');
        return [ownPokedexAction.page({})];
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
}
