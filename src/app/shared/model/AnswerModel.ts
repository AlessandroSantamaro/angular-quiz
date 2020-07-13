/**
 * Answer model
 */
export interface AnswerModel {
  id: string;
  text: string;
  correct: boolean; // In a real worl app the user can't receive the correct answer
}
