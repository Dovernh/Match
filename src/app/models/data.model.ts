import { Definition } from './definition.model';
import { Word } from './word.model';

export interface Data {
  words: Word[];
  definitions: Definition[];
}
