import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import {QuizComponent} from './quiz.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {QuizService} from './quiz.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AQ_CONSTANTS} from '../shared/constants/constants';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [QuizComponent],
      providers: [QuizService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get new question', () => {
    const service = jasmine.createSpyObj('QuizService', ['getQuestions', 'getDuration', 'getUTC']);

    const quizTime = AQ_CONSTANTS.quizTime;
    service.getDuration({
      hours: quizTime.hours,
      minutes: quizTime.minutes,
      seconds: quizTime.seconds
    });

    expect(service.getDuration).toHaveBeenCalledTimes(1);
  });

  it('Check quiz result', fakeAsync(inject([
    HttpTestingController,
    QuizService,
  ], (httpMock: HttpTestingController, service: QuizService) => {
    // const quiz = new QuizComponent();
    const quizTime = AQ_CONSTANTS.quizTime;
    const duration = service.getDuration({
      hours: quizTime.hours,
      minutes: quizTime.minutes,
      seconds: quizTime.seconds
    });

    component.checkResult(duration);

    expect(component.testResult).not.toBe(null);
    expect(component.timePassed).not.toBe(null);
    expect(component.showResult).toBe(true);
  })));

});
