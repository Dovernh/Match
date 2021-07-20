import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Probe } from './models/probe.model';
import { Definition } from './models/definition.model';
import { ProbeResults } from './models/probe-results.model';
import { Word } from './models/word.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  finalProbe?: Probe;

  constructor(private http: HttpClient) {}

  getWordsAndDefinitions(): Observable<Probe> {
    return this.http.get<Probe>('assets/data/probe.json');
  }

  selectWord(word: string, words: Word[], defs: Definition[]): string | null {
    let selectedWord: string | null = null;

    words.forEach((x) => {
      if (x.displayName === word) {
        if (x.assigned) {
          const def: Definition | undefined = defs.find(
            (x) => x.assignedWord === word
          );

          this.unassignWord(def, words);
        } else {
          selectedWord = word;
          x.selected = !x.selected;
        }
      } else {
        x.selected = false;
      }
    });

    return selectedWord;
  }

  assignWord(
    def: Definition,
    selectedWord: string | null,
    words: Word[]
  ): string | null {
    if (selectedWord) {
      if (def.assignedWord) {
        this.unassignWord(def, words);
      }

      def.assignedWord = selectedWord;

      words.forEach((x) => {
        if (x.displayName === selectedWord) {
          x.assigned = true;
          x.selected = false;
        }

        x.selected = false;
      });

      selectedWord = null;
    } else {
      if (def.assignedWord) {
        this.unassignWord(def, words);
      }
    }

    return selectedWord;
  }

  unassignWord(def: Definition | undefined, words: Word[]): void {
    if (!def) {
      return;
    }

    const word = words.find((x: Word) => x.displayName === def.assignedWord);

    if (word) {
      word.assigned = false;
      def.assignedWord = null;
    }
  }

  sortWords(words: Word[]): Word[] {
    const sortedWords = words.sort((a, b) =>
      a.displayName > b.displayName ? 1 : b.displayName < a.displayName ? -1 : 0
    );

    return sortedWords;
  }

  updateFinalProbe(probe?: Probe): void {
    this.finalProbe = probe;
  }

  getResults(): ProbeResults {
    let assigned = this.finalProbe?.definitions?.filter(
      (d) => d.assignedWord
    ).length;
    let unassigned = (this.finalProbe?.words?.length ?? 0) - (assigned ?? 0);

    return { assigned: assigned ?? 0, unassigned: unassigned };
  }
}
