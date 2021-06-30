import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-match-finish-confirm',
  templateUrl: './match-finish-confirm.component.html',
  styleUrls: ['./match-finish-confirm.component.scss'],
})
export class MatchFinishConfirmComponent {
  constructor(public dialogRef: MatDialogRef<MatchFinishConfirmComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
