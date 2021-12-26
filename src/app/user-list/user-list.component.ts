import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  genderMap: Map<string, string> = new Map<string, string>([
    ['male', 'Mężczyzna'],
    ['female', 'Kobieta'],
    ['other', 'Inna'],
    ['', 'Nie podano']
  ]);

  displayedColumns = ['firstName', 'lastName', 'age', 'gender', 'favouriteMovies', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.usersService.savedUsers);
    this.usersService.usersSubject.subscribe(value => this.dataSource.data = value);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(user: any) {
    this.usersService.deleteUser(user);
  }

}
