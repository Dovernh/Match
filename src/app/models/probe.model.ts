import { Definition } from './definition.model';
import { Word } from './word.model';

export interface Probe {
  words: Word[];
  definitions: Definition[];
}
