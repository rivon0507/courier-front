import { HttpInterceptorFn } from '@angular/common/http';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
