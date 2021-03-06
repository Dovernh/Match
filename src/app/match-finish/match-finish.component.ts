import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HowFeeling } from '../enums/how-feeling-enum';

@Component({
  selector: 'app-match-finish',
  templateUrl: './match-finish.component.html',
  styleUrls: ['./match-finish.component.scss'],
})
export class MatchFinishComponent {
  selectedFeeling: HowFeeling | null = null;

  constructor(private router: Router) {}

  onFeelingSelected(howFeeling: HowFeeling): void {
    this.selectedFeeling = howFeeling;
  }

  finish(): void {
    this.router.navigate(['/match-results']);
  }
}
