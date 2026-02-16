import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { getTranslocoModule } from "../../../test";

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [getTranslocoModule()]});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
