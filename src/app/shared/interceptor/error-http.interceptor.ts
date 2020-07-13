import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {Utils} from '../utilis/Utils';

/**
 * HTTP error interceptor
 */
@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        return throwError(this.getError(error));
      }),
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (!Utils.isSuccessResponse(evt)) {
            throw new Error(this.getError(evt));
          }
        }
        return evt;
      })
    );
  }

  private getError(error: any): string {
    const errorMessage = `Error: ${
    Utils.getError(error) ||
    'An error occurred retrieving data. Please try later.'
      }`;
    console.error(errorMessage);
    return errorMessage;
  }

}
