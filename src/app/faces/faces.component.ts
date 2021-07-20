import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HowFeeling } from '../enums/how-feeling-enum';

@Component({
  selector: 'app-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.scss'],
})
export class FacesComponent {
  @Output() selectedFeeling = new EventEmitter<HowFeeling>();

  howFeeling?: HowFeeling;
  HowFeeling = HowFeeling;

  onSelectFeeling(howFeeling: HowFeeling): void {
    this.howFeeling = howFeeling;
    this.selectedFeeling.emit(howFeeling);
  }
}
