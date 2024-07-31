import { TestBed } from '@angular/core/testing';

import { BookingRoomsService } from './booking-rooms.service';

describe('BookingRoomsService', () => {
  let service: BookingRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
