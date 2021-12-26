import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  savedUsers: Array<any> = JSON.parse(localStorage.getItem('users')) || [];
  usersCounter: BehaviorSubject<number> = new BehaviorSubject<number>(this.savedUsers.length);
  usersSubject: Subject<any> = new BehaviorSubject(this.savedUsers);

  addUser(user: any) {
    this.savedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(this.savedUsers));
    this.usersSubject.next(this.savedUsers);
    this.usersCounter.next(this.savedUsers.length);
  }

  deleteUser(user: any) {
    this.savedUsers.splice(this.savedUsers.indexOf(user), 1);
    localStorage.setItem('users', JSON.stringify(this.savedUsers));
    this.usersSubject.next(this.savedUsers);
    this.usersCounter.next(this.savedUsers.length);
  }
}
