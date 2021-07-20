import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HowFeeling } from '../enums/how-feeling-enum';

@Component({
  selector: 'app-match-begin',
  templateUrl: './match-begin.component.html',
  styleUrls: ['./match-begin.component.scss'],
})
export class MatchBeginComponent {
  selectedFeeling: HowFeeling | null = null;

  constructor(private router: Router) {}

  onFeelingSelected(howFeeling: HowFeeling): void {
    this.selectedFeeling = howFeeling;
  }

  start(): void {
    // TODO: log
    this.router.navigate(['/match']);
  }
}
