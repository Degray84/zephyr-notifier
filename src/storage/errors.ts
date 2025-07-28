import { ZephyrNotifierError } from '../errors';

export enum StorageErrorEnum {
  Load,
  Save,
}
type ErrorMessageFunction = (parts: string[]) => string;

const messages: Record<StorageErrorEnum, ErrorMessageFunction> = {
  [StorageErrorEnum.Load]: ([name]) =>
    `Что-то пошло не так при запросе файла ${name}`,
  [StorageErrorEnum.Save]: ([name]) =>
    `Что-то пошло не так при записи файла ${name}`,
};

export class StorageError extends ZephyrNotifierError {
  constructor(error: StorageErrorEnum, parts?: string[]) {
    super(messages[error](parts ?? []));
  }
}
