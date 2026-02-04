import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { authGuard } from './auth-guard';
import { SessionStore } from '@core/session/session.store';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let isAuthenticated = true;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {provide: SessionStore, useValue: {isAuthenticated: () => isAuthenticated}}
      ],
    });
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    isAuthenticated = true;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation when authenticated', () => {
    isAuthenticated = true;
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {url: '/inbox'} as RouterStateSnapshot)
    );
    expect(result).toBeTruthy();
  });

  it('should redirect to login with next when unauthenticated', () => {
    isAuthenticated = false;
    const stateUrl = '/envoi/42?filter=unread#top';
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {url: stateUrl} as RouterStateSnapshot)
    );
    expect(result instanceof UrlTree).toBeTruthy();
    const tree = result as UrlTree;
    expect(tree).toBeTruthy();
    const serialized = router.serializeUrl(tree);
    expect(serialized.startsWith('/auth/login')).toBeTruthy();
    expect(tree.queryParams['next']).toBe(stateUrl);
  });
});
