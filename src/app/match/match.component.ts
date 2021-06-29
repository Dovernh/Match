import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Definition } from '../models/definition.model';
import { Word } from '../models/word.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit, AfterViewInit {
  @ViewChild('headerContainer') headerContainer!: ElementRef;
  @ViewChild('defContainer') defContainer!: ElementRef;

  selectedWord: string | null = null;

  words: Word[] = [
    { displayName: 'coefficient', selected: false, assigned: false },
    { displayName: 'constant', selected: false, assigned: false },
    { displayName: 'domain', selected: false, assigned: false },
    { displayName: 'equation', selected: false, assigned: false },
    { displayName: 'expression', selected: false, assigned: false },
    { displayName: 'factors', selected: false, assigned: false },
    { displayName: 'function', selected: false, assigned: false },
    { displayName: 'inequality', selected: false, assigned: false },
    { displayName: 'integers', selected: false, assigned: false },
    { displayName: 'inverse', selected: false, assigned: false },
    { displayName: 'like terms ', selected: false, assigned: false },
    { displayName: 'linear equation', selected: false, assigned: false },
    { displayName: 'perfect square', selected: false, assigned: false },
    { displayName: 'point', selected: false, assigned: false },
    { displayName: 'quadratic equation', selected: false, assigned: false },
    { displayName: 'range', selected: false, assigned: false },
    { displayName: 'reciprocals', selected: false, assigned: false },
    { displayName: 'relation', selected: false, assigned: false },
    { displayName: 'roots', selected: false, assigned: false },
    { displayName: 'slope', selected: false, assigned: false },
  ];

  defs: Definition[] = [
    {
      definition: 'product of two numbers is 1',
      assignedWord: '',
    },
    {
      definition: 'lines and sets that never end',
      assignedWord: '',
    },
    {
      definition: 'positive or negative whole number or zero',
      assignedWord: '',
    },
    {
      definition: 'square root is a rational number',
      assignedWord: '',
    },
    {
      definition: 'intersection of two lines',
      assignedWord: '',
    },
    {
      definition: 'used when exact answer is unknown',
      assignedWord: '',
    },
    {
      definition: 'number in front of variable',
      assignedWord: '',
    },
    {
      definition: 'variables to second power',
      assignedWord: '',
    },
    {
      definition: 'value that never changes',
      assignedWord: '',
    },
    {
      definition: 'graph is straight line',
      assignedWord: '',
    },
    {
      definition: 'ratio of change in y to corresponding change in x',
      assignedWord: '',
    },
    {
      definition: 'values of independent variable',
      assignedWord: '',
    },
    {
      definition: 'one operation undoes effect of other operation',
      assignedWord: '',
    },
    {
      definition:
        'mathematical sentence stating that two expressions are equal',
      assignedWord: '',
    },
    {
      definition: 'solution for a quadratic equation',
      assignedWord: '',
    },
    {
      definition: 'quantities being multiplied',
      assignedWord: '',
    },
    {
      definition: 'values for dependent variable',
      assignedWord: '',
    },
    {
      definition: 'value in input has exactly one value in output',
      assignedWord: '',
    },
    {
      definition: 'contain same variables raised to same power',
      assignedWord: '',
    },
    {
      definition: 'rectangular arrangement of numbers in rows and columns',
      assignedWord: '',
    },
    {
      definition:
        'combines numbers and/or variables using mathematical operations',
      assignedWord: '',
    },
    {
      definition: 'set of ordered pairs',
      assignedWord: '',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.words.sort((a, b) =>
      a.displayName > b.displayName ? 1 : b.displayName < a.displayName ? -1 : 0
    );
  }

  ngAfterViewInit(): void {
    this.adjustDefContainerHeight();
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
        this.selectedWord = word;
        x.selected = true;
      } else {
        x.selected = false;
      }
    });
  }

  assignWord(def: Definition): void {
    if (this.selectedWord) {
      def.assignedWord = this.selectedWord;

      this.words.forEach((x) => {
        if (x.displayName === this.selectedWord) {
          x.assigned = true;
          x.selected = false;
        }

        x.selected = false;
      });

      this.selectedWord = null;
    }
  }

  unassignWord(def: Definition): void {
    const word = this.words.find((x) => x.displayName === def.assignedWord);

    if (word) {
      word.assigned = false;
      def.assignedWord = null;
    }
  }

  submitted(): void {
    this.router.navigate(['/match-finish']);
  }
}
