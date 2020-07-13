import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {QuestionComponent} from './question.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Question} from '../../model/Question';
import {Answer} from '../../model/Answer';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [QuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    setQuestion();
    fixture.detectChanges();
  });

  function setQuestion() {
    const answers = [
      {
        id: '1',
        text: 'to live',
        correct: true
      },
      {
        id: '2',
        text: 'to have lived',
        correct: false
      },
      {
        id: '3',
        text: 'to be lived',
        correct: false
      },
      {
        id: '4',
        text: 'to be living',
        correct: false
      }
    ];
    const questionMock = {
      answers,
      id: '1',
      text: 'I\'m very happy _____ in India. I really miss being there.'
    };
    let answersMock = [];
    answersMock = answers.map(answer => {
      return new Answer(answer);
    });
    component.question = new Question(questionMock.id, questionMock.text, answersMock);
  }

  it('should check selectAnswer method', () => {
    expect(component.selectedAnswerId).toBeNull();
    const question = component.question;
    const answers = question.getAnswers();
    component.selectAnswer(answers[0], question);
    expect(component.selectedAnswerId).not.toBeNull();
  });

  it('should have 4 possibile answers', () => {
    const answers = debugElement.queryAll(By.css('.aq-answer'));

    console.log(debugElement.nativeElement.outerHTML);

    expect(answers).toBeTruthy('No answer available');
    expect(answers.length).toBe(4, 'Wrong answer numbers');
  });


  it('should enable next button (with DoneFn)', (done: DoneFn) => {
    const answer = debugElement.nativeElement.querySelector('.aq-answer-1 button');
    answer.click();
    fixture.detectChanges();

    setTimeout(() => {
      const nextButton = debugElement.nativeElement.querySelector('.next-button');
      expect(nextButton.disabled).toBeFalsy();
      done();
    }, 1000);
  });

  it('should enable next button (with fakeAsync zone)', fakeAsync(() => {
    const answer = debugElement.nativeElement.querySelector('.aq-answer-1 button');
    const nextButton = debugElement.nativeElement.querySelector('.next-button');

    expect(nextButton.disabled).toBeTruthy();

    answer.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(nextButton.disabled).toBeFalsy();
    }, 1000);

    tick(1000); // Simulates the passage of time

    flush();

    expect(nextButton.disabled).toBeFalsy();
  }));

});
