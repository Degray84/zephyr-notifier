export interface ZephyrNotifierErrorOptions {
  cause?: unknown;
  parts?: string[];
}
export class ZephyrNotifierError extends Error {
  cause: unknown;

  constructor(message: string, { cause }: ZephyrNotifierErrorOptions = {}) {
    super(message);
    this.cause = cause;
  }
}
