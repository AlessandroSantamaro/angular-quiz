import {AnswerModel} from './AnswerModel';

/**
 * Answer function
 */
const Answer = (() => {
  const weakMap = new WeakMap();

  class Answer {
    constructor({id, text, correct}: AnswerModel) {
      // In a real worl app the user can't receive the correct answer
      // this logic needs to be on BE side
      weakMap.set(this, {id, text, correct});
    }

    getId() {
      return weakMap.get(this).id;
    }

    getText() {
      return weakMap.get(this).text;
    }

    getCorrect() {
      return weakMap.get(this).correct;
    }
  }

  return Answer;
})();

export {Answer};
