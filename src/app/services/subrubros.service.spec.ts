import { TestBed } from '@angular/core/testing';

import { SubrubrosService } from './subrubros.service';

describe('SubrubrosService', () => {
  let service: SubrubrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubrubrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
