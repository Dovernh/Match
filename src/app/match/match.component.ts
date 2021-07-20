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
import { CountDownComponent } from '../count-down/count-down.component';
import { MatchFinishConfirmComponent } from '../match-finish-confirm/match-finish-confirm.component';
import { Definition } from '../models/definition.model';
import { Word } from '../models/word.model';
import { Probe } from '../models/probe.model';
import { MatchService } from '../match.service';

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

  probe?: Probe;
  words!: Word[];
  defs!: Definition[];
  dialogRef!: MatDialogRef<MatchFinishConfirmComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.matchService.getWordsAndDefinitions().subscribe((probe) => {
      this.probe = probe;
      this.words = this.matchService.sortWords(this.probe.words);
      this.defs = this.probe.definitions;

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
    this.selectedWord = this.matchService.selectWord(
      word,
      this.words,
      this.defs
    );
  }

  assignWord(def: Definition): void {
    this.selectedWord = this.matchService.assignWord(
      def,
      this.selectedWord,
      this.words
    );
  }

  unassignWord(def: Definition): void {
    this.matchService.unassignWord(def, this.words);
  }

  submitted(): void {
    this.dialogRef = this.dialog.open(MatchFinishConfirmComponent);

    this.dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.countDownComponent.cancelTimer();
        this.matchService.updateFinalProbe(this.probe);
        this.router.navigate(['/match-finish']);
      }
    });
  }

  timeExpired(): void {
    this.matchService.updateFinalProbe(this.probe);
    this.router.navigate(['/match-finish']);
  }
}
