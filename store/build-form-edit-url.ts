import { History } from 'history';
import { assert } from 'ts-essentials';

export const buildFormEditUrl = (history: History, model: HasId) => {
  const pathWithoutModelIdRegex = /\/([^/]+)\//;
  const regexResult = pathWithoutModelIdRegex.exec(history.location.pathname);
  assert(regexResult);
  const pathWithoutModelId = regexResult[1];
  return `/${pathWithoutModelId}/${model.id}`;
};
