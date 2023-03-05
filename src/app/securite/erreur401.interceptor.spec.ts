import { TestBed } from '@angular/core/testing';

import { Erreur401Interceptor } from './erreur401.interceptor';

describe('Erreur401Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Erreur401Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Erreur401Interceptor = TestBed.inject(Erreur401Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
