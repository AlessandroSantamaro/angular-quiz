import {Component, Input, OnInit} from '@angular/core';
import {AQ_CONSTANTS} from '../shared/constants/constants';

/**
 * Outcome quiz
 */
@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit {

  /**
   * Quiz score
   */
  @Input() score: number = 0;

  /**
   * Time spent for the quiz
   */
  @Input() timePassed: string;

  /**
   * Outcome chart colors
   */
  innerStrokeColor: string;
  outerStrokeColor: string;

  constructor() {
  }

  ngOnInit(): void {
    this.setChartColor();
  }

  /**
   * Set outcome colors
   */
  setChartColor(): void {
    if (this.score >= 60) {
      this.innerStrokeColor = AQ_CONSTANTS.innerStrokeColorOk;
      this.outerStrokeColor = AQ_CONSTANTS.outerStrokeColorOk;
    } else if (this.score >= 40) {
      this.innerStrokeColor = AQ_CONSTANTS.innerStrokeColorWarning;
      this.outerStrokeColor = AQ_CONSTANTS.outerStrokeColorWarning;
    } else {
      this.innerStrokeColor = AQ_CONSTANTS.innerStrokeColorCritical;
      this.outerStrokeColor = AQ_CONSTANTS.outerStrokeColorCritical;
    }
  }

}
