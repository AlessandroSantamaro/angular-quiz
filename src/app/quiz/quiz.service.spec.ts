import {TestBed} from '@angular/core/testing';

import {QuizService} from './quiz.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('QuizService', () => {
  let service: QuizService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService]
    });
    service = TestBed.inject(QuizService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

});
