import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountDownComponent } from '../count-down/count-down.component';
import { MatchFinishConfirmComponent } from '../match-finish-confirm/match-finish-confirm.component';
import { Definition } from '../models/definition.model';
import { Word } from '../models/word.model';
import { Data } from '../models/data.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit, OnDestroy {
  @ViewChild('headerContainer') headerContainer!: ElementRef;
  @ViewChild('defContainer') defContainer!: ElementRef;
  @ViewChild(CountDownComponent) countDownComponent!: CountDownComponent;

  selectedWord: string | null = null;

  words!: Word[];
  defs!: Definition[];
  dialogRef!: MatDialogRef<MatchFinishConfirmComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('assets/data/data.json').subscribe((res) => {
      this.words = this.sortWords((res as Data).words as Word[]);
      this.defs = (res as Data).definitions as Definition[];

      setTimeout(() => {
        this.adjustDefContainerHeight();
      }, 100);
    });
  }

  ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustDefContainerHeight();
  }

  adjustDefContainerHeight() {
    const headerHeight = this.headerContainer.nativeElement as HTMLElement;

    (this.defContainer.nativeElement as HTMLElement).style.marginTop = `${
      headerHeight.clientHeight + 20
    }px`;
  }

  selectWord(word: string): void {
    this.selectedWord = null;

    this.words.forEach((x) => {
      if (x.displayName === word) {
        if (x.assigned) {
          const def: Definition | undefined = this.defs.find(
            (x) => x.assignedWord === word
          );

          this.unassignWord(def);
        } else {
          this.selectedWord = word;
          x.selected = !x.selected;
        }
      } else {
        x.selected = false;
      }
    });
  }

  assignWord(def: Definition): void {
    if (this.selectedWord) {
      if (def.assignedWord) {
        this.unassignWord(def);
      }

      def.assignedWord = this.selectedWord;

      this.words.forEach((x) => {
        if (x.displayName === this.selectedWord) {
          x.assigned = true;
          x.selected = false;
        }

        x.selected = false;
      });

      this.selectedWord = null;
    } else {
      if (def.assignedWord) {
        this.unassignWord(def);
      }
    }
  }

  unassignWord(def: Definition | undefined): void {
    if (!def) {
      return;
    }

    const word = this.words.find((x) => x.displayName === def.assignedWord);

    if (word) {
      word.assigned = false;
      def.assignedWord = null;
    }
  }

  submitted(): void {
    this.dialogRef = this.dialog.open(MatchFinishConfirmComponent);

    this.dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.countDownComponent.cancelTimer();

        this.router.navigate(['/match-finish'], {
          queryParams: { expired: false },
        });
      }
    });
  }

  timeExpired(): void {
    this.router.navigate(['/match-finish'], {
      queryParams: { expired: true },
    });
  }

  sortWords(words: Word[]): Word[] {
    const sortedWords = words.sort((a, b) =>
      a.displayName > b.displayName ? 1 : b.displayName < a.displayName ? -1 : 0
    );

    return sortedWords;
  }
}
