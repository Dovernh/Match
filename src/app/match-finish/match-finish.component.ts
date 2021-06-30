import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-finish',
  templateUrl: './match-finish.component.html',
  styleUrls: ['./match-finish.component.scss'],
})
export class MatchFinishComponent implements OnInit {
  timeExpired = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.timeExpired = this.route.snapshot.queryParams.expired;
  }
}
