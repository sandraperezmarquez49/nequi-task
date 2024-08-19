import { TestBed } from '@angular/core/testing';

import { NequiTaskService } from './nequi-task.service';

describe('NequiTaskService', () => {
  let service: NequiTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NequiTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
