import { ZephyrNotifierError } from "../errors";

export enum ScrapperErrorEnum {
  Default,
  NoElementFound,
  LoadUrl,
  ParsingLayout,
}
type ErrorMessageFunction = (parts: string[]) => string;

const messages: Record<ScrapperErrorEnum, ErrorMessageFunction> = {
  [ScrapperErrorEnum.Default]: () =>
    `Что-то пошло не так на при скраппинге страницы`,
  [ScrapperErrorEnum.NoElementFound]: ([selector]) =>
    `Элемент ${selector} не найден на странице`,
  [ScrapperErrorEnum.LoadUrl]: ([url]) =>
    `Не выполнить запрос к странице: ${url}`,
  [ScrapperErrorEnum.ParsingLayout]: ([url]) =>
    `Не удалось выполнить парсинг html кода, полученного со страницы: ${url}`,
};

export class ScrapperError extends ZephyrNotifierError {
  constructor(error: ScrapperErrorEnum, parts?: string[]) {
    super(messages[error](parts ?? []));
  }
}
