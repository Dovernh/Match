import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchBeginComponent } from './match-begin/match-begin.component';
import { MatchFinishComponent } from './match-finish/match-finish.component';
import { MatchResultsComponent } from './match-results/match-results.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '', redirectTo: '/match-begin', pathMatch: 'full' },
  { path: 'match-begin', component: MatchBeginComponent },
  { path: 'match', component: MatchComponent },
  { path: 'match-finish', component: MatchFinishComponent },
  { path: 'match-results', component: MatchResultsComponent },
  { path: '**', component: MatchBeginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
