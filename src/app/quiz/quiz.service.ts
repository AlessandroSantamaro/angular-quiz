import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../shared/constants/endpoints.constant';
import {environment} from '../../environments/environment';
import {Question} from '../shared/model/Question';
import {Observable} from 'rxjs';
import * as moment from 'moment/moment';
import {Duration, DurationInputArg2} from 'moment';
import {DurationInputArg1} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(environment.baseUrl + ENDPOINTS.questions);
  }

  getDuration(duration: DurationInputArg1, unit?: DurationInputArg2): Duration {
    return moment.duration(duration, unit);
  }

  getUTC(durationMilliseconds: number): string {
    return moment.utc(durationMilliseconds).format('m[m]s[s]');
  }

}
