import { TestBed } from '@angular/core/testing';

import { SessionStore } from './session.store';
import { AuthApi } from '@core/api/auth.api';
import { AuthApiMock, MOCK_API_DELAY } from '@core/api/auth.api.mock';

describe('SessionStore', () => {
  let service: SessionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthApi, useClass: AuthApiMock},
        {provide: MOCK_API_DELAY, useValue: 0}
      ]
    });
    service = TestBed.inject(SessionStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
