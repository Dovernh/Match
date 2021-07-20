import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { startWith, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() endMinutes = 5;
  @Output() submitted = new EventEmitter<void>();
  @Output() timeExpired = new EventEmitter<void>();

  dateNow = new Date();
  endDate = new Date(
    this.dateNow.setMinutes(this.dateNow.getMinutes() + this.endMinutes)
  );
  hoursInADay = 24;
  milliSecondsInASecond = 1000;
  minutesInAnHour = 60;
  secondsInAMinute = 60;
  subscription!: Subscription;

  minutesToEndDate = 0;
  secondsToEndDate = 0;
  timeDifference = 5;

  constructor() {}

  ngOnInit(): void {
    this.subscription = interval(1000)
      .pipe(
        startWith(0),
        tap(() => (this.timeDifference <= 0 ? this.timeExpired.emit() : null)),
        takeWhile(() => this.timeDifference > 0)
      )
      .subscribe((x) => {
        this.getTimeDifference();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTimeDifference() {
    this.timeDifference = this.endDate.getTime() - new Date().getTime();
    this.displayTimeRemaining();
  }

  displayTimeRemaining() {
    this.secondsToEndDate = Math.floor(
      (this.timeDifference / this.milliSecondsInASecond) % this.secondsInAMinute
    );

    this.minutesToEndDate = Math.floor(
      (this.timeDifference /
        (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.secondsInAMinute
    );
  }

  cancelTimer(): void {
    this.timeDifference = 0;
  }

  submit(): void {
    this.submitted.emit();
  }
}
