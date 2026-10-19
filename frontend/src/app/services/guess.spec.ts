import { TestBed } from '@angular/core/testing';

import { GuessService } from './guess.service.js';

describe('Guess', () => {
  let service: GuessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
