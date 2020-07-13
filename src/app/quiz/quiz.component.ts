import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Question} from '../shared/model/Question';
import {Answer} from '../shared/model/Answer';
import {QuizService} from './quiz.service';
import {interval, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Utils} from '../shared/utilis/Utils';
import {AQ_CONSTANTS} from '../shared/constants/constants';
import {AnswerModel} from '../shared/model/AnswerModel';
import {Duration} from 'moment';
import {ModalConfig} from '../shared/model/ModalConfig';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../shared/components/modal/modal.component';
import {Router} from '@angular/router';

/**
 * Quiz
 */
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  /**
   * Modal
   */
  @ViewChild('quizModal', {static: false}) private quizModal: ModalComponent;
  quizModalConfig: ModalConfig;

  /**
   * Chart colors
   */
  innerStrokeColor: string = AQ_CONSTANTS.innerStrokeColorOk;
  outerStrokeColor: string = AQ_CONSTANTS.outerStrokeColorOk;

  /**
   * Quiz questions
   */
  questions: Array<Question> = [];

  /**
   * Current question
   */
  currentQuestion: Question = null;

  /**
   * Quiz utils
   */
  private userAnwers: Array<AnswerModel> = [];
  private index: number = 0;
  private questionsKey: Array<string> = [];

  /**
   * Quiz outcome results
   */
  showResult: boolean = false;
  testResult: number = 0;

  /**
   * Quiz time utils
   */
  maxQuizDuration: Duration;
  timeTest: string;
  timePassed: string;
  timePercentage: number = 0;
  totalSeconds: number = 0;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.newQuiz();
  }

  public ngOnDestroy(): void {
    this.unsubscribeServices();
  }

  /**
   * Unsubscribe component services
   */
  unsubscribeServices(): void {
    if (!this.unsubscribe.closed) {
      // Quiz not completed
      this.unsubscribe.next();
      this.unsubscribe.complete();
      this.unsubscribe.unsubscribe();
    }
  }

  /**
   * Set modal properties
   * @param id
   * @param title
   * @param description
   * @param okButtonLabel
   * @param okButtonClick
   * @param closeButtonClick
   */
  setModal(
    id: string,
    title: string,
    description: string,
    okButtonLabel: string,
    okButtonClick: (duration: Duration) => void,
    closeButtonClick: (duration: Duration) => void) {
    this.quizModalConfig = {
      id,
      title,
      description,
      okButtonLabel,
      okButtonClick,
      closeButtonClick,
    };
  }

  /**
   * Init a quiz
   */
  initQuiz() {
    this.userAnwers = [];
    this.showResult = false;
    this.testResult = 0;
    this.index = 0;
    this.questionsKey = [];
    this.innerStrokeColor = AQ_CONSTANTS.innerStrokeColorOk;
    this.outerStrokeColor = AQ_CONSTANTS.outerStrokeColorOk;
    this.setModal(
      'quizModal',
      'QUIZ COMPLETED',
      'Check your result!',
      'OK',
      () => {
        this.checkResult(this.maxQuizDuration);
      },
      () => {
        this.checkResult(this.maxQuizDuration);
      }
    );
  }

  /**
   * Start a quiz
   */
  newQuiz() {
    // Initialize a quiz
    this.initQuiz();

    const questionsObserver = {
      next: res => {
        // Get questions
        this.setQuizQuestions(res?.questions, this.questions);

        // Set quiz time limit
        this.maxQuizDuration = this.getTimeDuration(AQ_CONSTANTS.quizTime);

        // Start quiz time
        this.startQuiz(this.maxQuizDuration);

        this.index = 0;
        this.questionsKey = Object.keys(this.questions);
        this.currentQuestion = this.questions[this.questionsKey[this.index]];
      },
      error: err => {
        console.error('Cannot retrieve questions' + err);
        this.setModal(
          'quizModal',
          'QUIZ',
          'Cannot retrieve questions!',
          'OK',
          () => {
            this.checkResult(this.maxQuizDuration);
          },
          () => {
            this.checkResult(this.maxQuizDuration);
          }
        );
        this.quizModal.open();
      }
    };

    // Retrieve quiz questions
    this.quizService
      .getQuestions()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(questionsObserver);
  }

  /**
   * Map response in Question and Answer model
   * @param questions
   * @param quizQuestions
   */
  setQuizQuestions(questions: Array<{ answers: Array<AnswerModel>, id: string, text: string }>, quizQuestions: Array<Question>): void {
    let answers;
    questions?.forEach(question => {
      answers = question.answers.map(answer => {
        return new Answer(answer);
      });
      quizQuestions[question.id] = new Question(question.id, question.text, answers);
    });
  }

  startQuiz(maxQuizDuration: Duration) {
    let remainingSeconds: number;
    this.totalSeconds = remainingSeconds = maxQuizDuration.minutes() * 60 + maxQuizDuration.seconds();
    this.timePercentage = 0;
    this.timeTest = this.quizService.getUTC(maxQuizDuration.asMilliseconds());
    const time = interval(1000);
    time
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(seconds => {
        if (remainingSeconds <= 0) {
          // End quiz
          this.timePercentage = 100;
          this.unsubscribeServices();
          this.quizModalConfig.description = 'Time\'s up. Check your result!';
          this.quizModal.open();

        } else {
          // Quiz not ended, calculate time and set colors
          maxQuizDuration = this.quizService.getDuration(maxQuizDuration.asSeconds() - 1, 'seconds');
          this.timeTest = this.quizService.getUTC(maxQuizDuration.asMilliseconds());
          remainingSeconds--;
          this.timePercentage = 100 - Utils.getPercent(remainingSeconds, this.totalSeconds);
          if (this.timePercentage === 70) {
            this.innerStrokeColor = AQ_CONSTANTS.innerStrokeColorWarning;
            this.outerStrokeColor = AQ_CONSTANTS.outerStrokeColorWarning;
          } else if (this.timePercentage > 90) {
            this.innerStrokeColor = AQ_CONSTANTS.innerStrokeColorCritical;
            this.outerStrokeColor = AQ_CONSTANTS.outerStrokeColorCritical;
          }
        }
      });
  }

  /**
   * Store user answer
   */
  storeSelectedAnswer(obj): void {
    this.userAnwers[obj.question.getId()] = obj.answer;
  }

  /**
   * Retrieve next question
   */
  nextQuestion(): void {
    if (this.index >= (this.questionsKey.length - 1)) {
      this.unsubscribeServices();
      this.checkResult(this.maxQuizDuration);
    } else {
      this.currentQuestion = this.questions[this.questionsKey[++this.index]];
    }
  }

  /**
   * Caculate the time passed
   * @param quizTime
   */
  getTimeDuration(quizTime: {
    hours: number,
    minutes: number,
    seconds: number
  }): Duration {
    return this.quizService.getDuration({
      hours: quizTime.hours,
      minutes: quizTime.minutes,
      seconds: quizTime.seconds
    });
  }

  /**
   * Check quiz result
   */
  checkResult(duration: Duration): void {
    // Calculate correct anwsers
    // In a real worl app this logic is on backend, the user can't receive the correct answers
    let countCorrect = 0;
    Object.keys(this.userAnwers).forEach((currentAnswer: string) => {
      const answer = this.userAnwers[currentAnswer];
      if (answer.getCorrect()) {
        countCorrect++;
      }
    });
    this.testResult = Utils.getPercent(countCorrect, this.questionsKey.length);

    // Calculate quiz time
    const quizTime = this.getTimeDuration(AQ_CONSTANTS.quizTime).asMilliseconds();
    const totalTime = this.quizService.getDuration({milliseconds: quizTime - duration.asMilliseconds()});
    this.timePassed = this.quizService.getUTC(totalTime.asMilliseconds());

    this.showResult = true;
  }

  /**
   * Exit quiz
   */
  exit() {
    this.router.navigate(['/home']);
  }

}
