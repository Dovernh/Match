import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { ProbeResults } from '../models/probe-results.model';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss'],
})
export class MatchResultsComponent implements OnInit {
  results?: ProbeResults;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.results = this.matchService.getResults();
  }
}
