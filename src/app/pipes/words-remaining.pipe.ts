import { Pipe, PipeTransform } from '@angular/core';
import { Word } from '../models/word.model';

@Pipe({
  name: 'wordsRemaining',
  pure: false,
})
export class WordsRemainingPipe implements PipeTransform {
  transform(words: Word[] | undefined): number {
    if (!words) {
      return 0;
    }

    return words.filter((w) => !w.assigned).length;
  }
}
