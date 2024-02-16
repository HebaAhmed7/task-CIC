import { Router } from '@angular/router';
import { UserModel } from '../../material/user-model';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  constructor(
    private router:Router ,
    private userService:UserService,
    ){}

  user:UserModel[]
  @Input()users : UserModel
  // @Output() createFormUser = new EventEmitter<void>();

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'BirthDate', 'phoneNumber',
  'isActive', 'countryCode','actions' ];
  dataSource: [];

  searchControl = new FormControl('');


  @ViewChild(MatPaginator, { static: true }) paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



addUser(){
   this.router.navigate(['user-form'])
  }
getUsers() {
    this.userService.getUsers().subscribe((data: UserModel[]) => {
       this.user = data;
      });
  }

 deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data:any) => {
        this.getUsers();
      });

  }
updateUsers(user:UserModel){

  }

   ngOnInit(): void {
   this.getUsers()

}
}
