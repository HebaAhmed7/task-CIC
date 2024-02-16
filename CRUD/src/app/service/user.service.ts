import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../material/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private users: UserModel[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      phoneNumber: '1234567890',
      countryCode: 'uk',
      isActive: true,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1997-05-15',
      phoneNumber: '9876543210',
      countryCode: 'Eg',
      isActive: false,
    },
    {
      id: 3,
      firstName: 'jan',
      lastName: 'Doe',
      birthDate: '1980-01-01',
      phoneNumber: '1234567790',
      countryCode: 'uk',
      isActive: true,
    },
    {
      id: 4,
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1992-05-15',
      phoneNumber: '9876778210',
      countryCode: 'Eg',
      isActive: false,
    },
    {
      id: 5,
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1992-05-15',
      phoneNumber: '9876778210',
      countryCode: 'Eg',
      isActive: false,
    },
    {
      id: 6,
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1992-05-15',
      phoneNumber: '9876778210',
      countryCode: 'Eg',
      isActive: false,
    },
  ];
  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >(this.users);

  public getUsers(): Observable<UserModel[]> {
    return this.usersSubject.asObservable();
  }

  public getUser(userId: number): Observable<UserModel> {
    return of(this.users[this.users.findIndex((user) => user.id === userId)]);
  }

  public addUser(user: UserModel) {
    let newUserId: number = 0;
    for (let i = 0; ; i++) {
      if (this.users.findIndex((user) => user.id === i + 1) === -1) {
        newUserId = i + 1;
        break;
      }
    }

    if (newUserId) {
      user.id = newUserId;
      this.users.push({ ...user });
    }
  }

  updateUser(id: number, user: UserModel) {
    const index = this.users.findIndex((u) => u.id === id);
    user.id = id;
    this.users[index] = { ...user };
  }

  deleteUser(id: number): Observable<UserModel[]> {
    const index = this.users.splice(
      this.users.findIndex((user) => user.id === id),
      1
    );
    return this.usersSubject.asObservable();
  }
}
