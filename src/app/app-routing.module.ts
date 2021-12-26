import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {UserListComponent} from './user-list/user-list.component';


const routes: Routes = [
  {
    path: 'register', component: RegistrationFormComponent,
  },
  {
    path: 'users', component: UserListComponent
  },
  {
    path: '**', redirectTo: 'register'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
