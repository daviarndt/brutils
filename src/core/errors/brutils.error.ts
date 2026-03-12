export class BRUtilsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BRUtilsError";
  }
}
