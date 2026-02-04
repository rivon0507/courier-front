import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionStore } from '@core/session/session.store';

export const authGuard: CanActivateFn = (_route, state) => {
  const sessionStore = inject(SessionStore);
  const router = inject(Router);
  if (sessionStore.isAuthenticated()) return true;
  return router.createUrlTree(
    ["/auth/login"],
    {queryParams: {next: state.url}},
  );
};
