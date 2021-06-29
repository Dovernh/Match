import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchFinishComponent } from './match-finish/match-finish.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  {
    path: '',
    component: MatchComponent,
  },
  {
    path: 'match-finish',
    component: MatchFinishComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
