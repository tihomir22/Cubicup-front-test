import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { pokedexApiActions } from '../redux/actions/pokedex-api.action';
import { selectPokemons } from '../redux/app.selector';

@Injectable({
  providedIn: 'root',
})
export class PokemonExistGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let valor = next.params.id;
    this.store.dispatch(
      pokedexApiActions.getPokemon({
        name: valor,
        onSuccess: (x) => {
          if (x.length == 0) {
            this.toastr.error(
              'Redirigiendo a la vista generica',
              'Pokemon no encontrado'
            );
            this.router.navigate(['/']);
          }
        },
      })
    );

    return true;
  }
}
