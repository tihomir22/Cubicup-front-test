import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { pokedexApiActions } from '../actions/pokedex-api.action';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigPageApi } from '../../shared/config-page-api.model';

@Injectable()
export class PokedexAPIEffects {
  pagePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Array<any>>(pokedexApiActions.page),
      switchMap((action) => {
        return this.http
          .get(
            environment.API_URL +
              `pokemon?limit=${action.config.limit}&offset=${action.config.offset}`
          )
          .pipe(
            map((x) => {
              return x['results'].map((entry) =>
                this.http.get(environment.API_URL + 'pokemon/' + entry.name)
              );
            })
          );
      }),
      switchMap((x) => {
        return forkJoin(x);
      }),
      switchMap((x) => {
        return [pokedexApiActions.setPage({ pokemons: x as any })];
      })
    )
  );

  getPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Array<any>>(pokedexApiActions.getPokemon),
      switchMap((action) => {
        return this.http
          .get(environment.API_URL + `pokemon/${action.name}`)
          .pipe(
            catchError((x) => {
              return of(x);
            }),
            map((x) => [x, action])
          );
      }),
      switchMap(([x, action]) => {
        let finalData = x instanceof HttpErrorResponse ? [] : [x];
        if (action.onSuccess) {
          action.onSuccess(finalData);
        }
        return [pokedexApiActions.setPage({ pokemons: finalData as any })];
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
