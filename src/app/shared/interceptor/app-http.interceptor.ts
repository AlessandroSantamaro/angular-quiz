import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Utils} from '../utilis/Utils';

/**
 * HTTP interceptor
 */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(evt => {
        if (evt instanceof HttpResponse) {
          if (Utils.isSuccessResponse(evt)) {
            evt = evt.clone({body: evt.body.default.data});
          }
        }
        return evt;
      })
    );
  }

}
