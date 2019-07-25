import { TestBed } from '@angular/core/testing';

import { UseractionService } from './useraction.service';

describe('UseractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseractionService = TestBed.get(UseractionService);
    expect(service).toBeTruthy();
  });
});
