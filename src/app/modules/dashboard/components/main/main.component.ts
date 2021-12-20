import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ownPokedex, selectPokemons } from 'src/app/redux/app.selector';
import { PokedexApp } from 'src/app/redux/app.state';
import { PokemonDetails } from '../../../../shared/pokemon-details.model';
import { cloneDeep } from 'lodash';
import { pokedexApiActions } from 'src/app/redux/actions/pokedex-api.action';
import { ownPokedexAction } from 'src/app/redux/actions/own-pokedex.action';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public virtualPokemons: Array<PokemonDetails> = [];
  public busquedaPorNombre: string = '';
  private clonedVirtualPokemons: Array<PokemonDetails> = [];
  public ownPokedexRegisteredPokemons: Array<{ name: string }> = [];
  public vistasDisponibles: 'rejilla' | 'listado' | 'slider' = 'rejilla';
  public opcionesSeleccionVista = [
    { icon: 'pi pi-id-card', type: 'rejilla' },
    { icon: 'pi pi-list', type: 'listado' },
    { icon: 'pi pi-sliders-h', type: 'slider' },
  ];

  constructor(
    private store: Store<PokedexApp>,
    private activatedRoute: ActivatedRoute
  ) {
    let pokemonSet = this.activatedRoute.snapshot.paramMap.get('id');
    if (!pokemonSet) {
      this.store.dispatch(
        pokedexApiActions.page({
          config: {
            limit: 25,
            offset: 0,
          },
        })
      );
    }
    this.store.select(selectPokemons).subscribe((data: any) => {
      this.virtualPokemons = data;
      this.clonedVirtualPokemons = cloneDeep(data);
    });
  }

  ngOnInit(): void {
    this.store
      .select(ownPokedex)
      .subscribe((data) => (this.ownPokedexRegisteredPokemons = [...data]));

    this.store.dispatch(ownPokedexAction.page({}));
    interval(1000).subscribe((data)=>console.log(this.vistasDisponibles))
  }

  public selectView(item){
    console.log(item)
  }

  public realizarBusqueda() {
    this.virtualPokemons = this.clonedVirtualPokemons.filter((entry) =>
      entry.name.toLowerCase().includes(this.busquedaPorNombre.toLowerCase())
    );
  }

  public returnLabelDependingIfAlreadyOnPokedex(namePokemon: string) {
    let isAdded = this.isPokomonAddedToPokedex(namePokemon);
    return isAdded
      ? `Eliminar a ${namePokemon} de la pokedex`
      : `Añadir a ${namePokemon} en la pokedex`;
  }

  public isPokomonAddedToPokedex(namePokemon: string): boolean {
    return !!this.ownPokedexRegisteredPokemons.find(
      (entry) => entry.name.toLowerCase() == namePokemon.toLowerCase()
    );
  }

  public addPokemonToPokedex(namePokemon: string) {
    this.store.dispatch(
      ownPokedexAction.addPokemon({ pokemonName: namePokemon })
    );
  }

  public removePokemonFromPokedex(namePokemon: string) {
    this.store.dispatch(
      ownPokedexAction.removePokemon({ pokemonName: namePokemon })
    );
  }
}
