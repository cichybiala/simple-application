import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UsersService} from './services/users.service';
import { rotateInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
  rotateInOnEnterAnimation({ anchor: 'open', duration: 800, delay: 0, degrees: -180 }),
  rotateInOnEnterAnimation({ anchor: 'close', duration: 800, delay: 0, degrees: 180 }),
]
})
export class AppComponent implements OnInit {
  usersCount$: Observable<any>;
  currentDateTime;
  clockInterval;

  constructor(private usersService: UsersService) {
    this.currentDateTime = Date.now();
  }

  ngOnInit() {
    this.clockInterval = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
    this.usersCount$ = this.usersService.usersCounter;
  }
}
