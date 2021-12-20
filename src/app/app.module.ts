import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InjectionToken } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ownPokedexReducer, pokedexReducer } from '../app/redux/app.reducer';
import { PokedexAPIEffects } from './redux/effects/pokedex-api.effects';
import { OwnPokedexEffects } from './redux/effects/own-pokedex.effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      pokemons: pokedexReducer,
      ownPokedex: ownPokedexReducer,
    }),
    EffectsModule.forRoot([PokedexAPIEffects, OwnPokedexEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
