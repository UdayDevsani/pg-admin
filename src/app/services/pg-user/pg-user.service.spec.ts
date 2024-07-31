import { TestBed } from '@angular/core/testing';

import { PgUserService } from './pg-user.service';

describe('PgUserService', () => {
  let service: PgUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
