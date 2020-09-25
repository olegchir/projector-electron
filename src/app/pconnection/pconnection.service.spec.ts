import { TestBed } from '@angular/core/testing';

import { PconnectionService } from './pconnection.service';

describe('PconnectionService', () => {
  let service: PconnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PconnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
