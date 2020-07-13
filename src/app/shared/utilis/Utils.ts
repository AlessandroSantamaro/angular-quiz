/**
 * Utils class
 */
export class Utils {

  /**
   * Check is a http response is valid.
   */
  public static isSuccessResponse(evt: any): boolean {
    return (evt?.body?.default &&
      evt.body.default.error === null &&
      evt.body.default.messageResponse?.code === 'OK');
  }

  /**
   * Get error message.
   */
  public static getError(error: any): string {
    return error?.message || error?.body?.default?.error?.message;
  }

  /**
   * Calculate the percentage
   * @param percentFor your value to get in percentage
   * @param percentOf total value of percentage
   */
  public static getPercent(percentFor: number, percentOf: number): number {
    return Math.floor(percentFor / percentOf * 100);
  }

}
