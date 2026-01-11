import { HttpInterceptorFn } from '@angular/common/http';
import { DEFAULT_INCLUDE_LANGUAGE_PARAM } from './api';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = req.headers.set('Content-Type', 'application/json;charset=utf-8');

  const params =
    req.method === 'GET'
      ? req.params.set('language', req.params.get('language') ?? DEFAULT_INCLUDE_LANGUAGE_PARAM)
      : req.params;

  const apiReq = req.clone({
    url: `/api${req.url}`,
    headers,
    params,
  });
  return next(apiReq);
};
