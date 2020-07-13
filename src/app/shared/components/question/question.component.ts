import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Question} from '../../model/Question';

/**
 * Question quiz
 */
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  /**
   * Question number
   */
  @Input() index: number = 0;

  /**
   * Quiz question
   */
  @Input() question: Question;

  /**
   * Get a new question
   */
  @Output() nextQuestion: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Set the clicked answer
   */
  @Output() setSelectedAnswer: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Selected answer id
   */
  selectedAnswerId: number = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Select answer
   * @param answer
   * @param question
   */
  selectAnswer(answer, question) {
    if (this.selectedAnswerId !== answer.getId()) {
      this.selectedAnswerId = answer.getId();
      this.setSelectedAnswer.emit({answer, question});
    }
  }

  /**
   * New question
   */
  next() {
    this.resetSelectedAnswer();
    this.nextQuestion.emit();
  }

  /**
   * Reset selected answer
   */
  resetSelectedAnswer() {
    this.selectedAnswerId = null;
  }

  /**
   * Exit quiz
   */
  exit() {
    this.router.navigate(['/home']);
  }

}
