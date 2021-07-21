import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CountDownComponent } from './count-down/count-down.component';
import { MatchComponent } from './match/match.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchFinishComponent } from './match-finish/match-finish.component';
import { MatchFinishConfirmComponent } from './match-finish-confirm/match-finish-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatchBeginComponent } from './match-begin/match-begin.component';
import { MatButtonModule } from '@angular/material/button';
import { FacesComponent } from './faces/faces.component';
import { MatchResultsComponent } from './match-results/match-results.component';
import { WordsRemainingPipe } from './pipes/words-remaining.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountDownComponent,
    MatchComponent,
    MatchFinishComponent,
    MatchFinishConfirmComponent,
    MatchBeginComponent,
    FacesComponent,
    MatchResultsComponent,
    WordsRemainingPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
