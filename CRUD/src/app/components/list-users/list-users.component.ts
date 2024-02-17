import { Router } from '@angular/router';
import { UserModel } from '../../model/user-model';
import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private readonly destroyRef: DestroyRef
  ) {}

  public dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'BirthDate',
    'phoneNumber',
    'isActive',
    'countryCode',
    'actions',
  ];

  public searchControl = new FormControl('');

  @ViewChild(MatPaginator, { static: true })
  paginator: MatTableDataSourcePaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public async addUser() {
    await this.router.navigate(['user-form']);
  }
  private getUsers() {
    this.userService.getUsers().subscribe((data: UserModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      this.getUsers();
    });
  }
  public async updateUsers(userId: number) {
    await this.router.navigate(['user-form', userId]);
  }

  public ngOnInit(): void {
    this.getUsers();
    this.listenToSearchValueChanges();
  }

  private listenToSearchValueChanges(): void {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(500))
      .subscribe((value) => {
        this.userService
          .getUsers()
          .pipe(
            map((data) => {
              if (value) {
                return data.filter(
                  (user) =>
                    user.firstName
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(value.toLowerCase())
                );
              }
              return data;
            })
          )
          .subscribe((users) => {
            this.dataSource.data = users;
          });
      });
  }
}
