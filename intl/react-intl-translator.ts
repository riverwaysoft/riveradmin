import { IntlShape } from 'react-intl';
import { Translator } from './translator';

export class ReactIntlTranslator implements Translator {
  constructor(private intl: IntlShape) {}

  translate(messageId: string): string {
    return this.intl.formatMessage({ id: messageId });
  }
}
