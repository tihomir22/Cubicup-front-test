import { TestBed } from '@angular/core/testing';

import { PokemonExistGuard } from './pokemon-exist.guard';

describe('PokemonExistGuard', () => {
  let guard: PokemonExistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PokemonExistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
