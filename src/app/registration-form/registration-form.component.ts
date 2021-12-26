import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  fadeInUpOnEnterAnimation,
  rubberBandAnimation,
  slideInUpOnEnterAnimation,
  slideOutLeftOnLeaveAnimation, zoomOutUpOnLeaveAnimation,
} from 'angular-animations';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100, translate: '30px' }),
    zoomOutUpOnLeaveAnimation({ anchor: 'leave' }),
    rubberBandAnimation({anchor: 'rubber', direction: '=>', duration: 500}),
    slideInUpOnEnterAnimation(),
    slideOutLeftOnLeaveAnimation(),
  ]
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;
  error = {
    required: 'To pole jest wymagane.',
    min: 'Minimalny wiek to 18 lat.',
    max: 'Podany wiek jest zbyt duży, ludzie nie żyją tak długo \;)'
  };

  genders = [
    {code: 'male', value: 'Mężczyzna'},
    {code: 'female', value: 'Kobieta'},
    {code: 'other', value: 'Inna'}
  ]

  favouriteMarvelMovies = [
    'Iron Man',
    'Iron Man 2',
    'Iron Man 3',
    'Incredible Hulk',
    'Thor',
    'Thor: Dark World',
    'Thor: Ragnarok',
    'Guardians of the Galaxy',
    'Guardians of the Galaxy vol. 2',
    'Captain America',
    'Captain America: Winter Soldier',
    'Captain America: Civil War',
    'Dr Strange',
    'Avengers',
    'Avengers: Age of Ultron',
    'Avengers: Infinity War',
    'Avengers: End Game'
  ]
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.min(18), Validators.max(150)]),
      gender: new FormControl(''),
      favouriteMovies: new FormControl('')
    });
    this.favouriteMarvelMovies = this.favouriteMarvelMovies.sort((a,b) => a.localeCompare(b));
  }

  save() {
    const userData = this.registrationForm.getRawValue();
    this.usersService.addUser(userData);
    this.registrationForm.reset();
  }

  getUserAvatar() {
    const firstName = this.registrationForm.get('firstName').value;
    const lastName = this.registrationForm.get('lastName').value;
    if (firstName && lastName) {
      return firstName[0].toUpperCase() + ' ' + lastName[0].toUpperCase();
    } else {
      return '';
    }
  }

}
