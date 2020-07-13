import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ENDPOINTS} from '../constants/endpoints.constant';
import {environment} from '../../../environments/environment';
import * as questions from '../../../assets/mock/questions.json';

/**
 * Mock HTTP interceptor
 */
@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {
  api: string = environment.baseUrl;

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if ((request.method === 'GET')) {
      const url = request.url.substr(request.url.indexOf(this.api) + this.api.length);
      let response;
      switch (url) {
        case ENDPOINTS.questions:
          response = questions;
          break;
        default:
          response = {};
          break;
      }

      return new Observable(observer => {
        observer.next(new HttpResponse<Array<any>>({
          body: response,
          status: 200
        }));
        observer.complete();
      });
    }

    return next.handle(request);
  }
}
