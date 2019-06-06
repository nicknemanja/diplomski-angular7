import { TestBed } from '@angular/core/testing';

import { CryptocurrencyService } from './cryptocurrency.service';

describe('CryptocurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptocurrencyService = TestBed.get(CryptocurrencyService);
    expect(service).toBeTruthy();
  });
});
