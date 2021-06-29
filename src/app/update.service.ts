import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    if (!swUpdate.isEnabled) {
      console.log('Service worker is not enabled');
    }
  }

  checkForUpdate(): void {
    this.swUpdate.available.subscribe(() => this.promptUser());
  }

  promptUser(): void {
    const snackbar = this.snackbar.open('Update available', 'Reload', {
      duration: 10 * 1000,
    });

    snackbar.onAction().subscribe(() => {
      this.swUpdate.activateUpdate().then(() => window.location.reload());
    });
  }
}
