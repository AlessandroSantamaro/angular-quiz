import {AnswerModel} from './AnswerModel';

/**
 * Question model
 */
export class Question {
  getId;
  getText;
  getAnswers;

  constructor(id: string, text: string, answers: Array<AnswerModel>) {
    const _id = id;
    const _text = text;
    const _answers = answers;

    // Methods defined in the constructor capture variables in a closure
    this.getId = () => _id;
    this.getText = () => _text;
    this.getAnswers = () => _answers;
  }

}
