import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../material/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}
 private users: UserModel[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', birthDate: '1990-01-01', phoneNumber: '1234567890', countryCode:'uk',isActive: true },
    { id: 2, firstName: 'Jane', lastName: 'Smith', birthDate: '1997-05-15', phoneNumber: '9876543210',countryCode:'Eg', isActive: false },
    { id: 3, firstName: 'jan', lastName: 'Doe', birthDate: '1980-01-01', phoneNumber: '1234567790', countryCode:'uk',isActive: true },
    { id: 4, firstName: 'Jane', lastName: 'Smith', birthDate: '1992-05-15', phoneNumber: '9876778210',countryCode:'Eg', isActive: false },
    { id: 4, firstName: 'Jane', lastName: 'Smith', birthDate: '1992-05-15', phoneNumber: '9876778210',countryCode:'Eg', isActive: false },
    { id: 4, firstName: 'Jane', lastName: 'Smith', birthDate: '1992-05-15', phoneNumber: '9876778210',countryCode:'Eg', isActive: false }
  ];
  private usersSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(this.users);

 getUsers():Observable<UserModel[]> {
      this.users;
    return this.usersSubject.asObservable();
  }


  addUser(user: UserModel){
     this.users.push(user);
   return this.usersSubject.next(this.users);
  }

  updateUser(id: number, user: UserModel) {
    const index = this.users.findIndex(u => u.id === id);
    this.users[index] = user;
  }


   deleteUser(id: number):Observable<UserModel[]> {
    const index = this.users.findIndex(user => user.id === id);
    return this.usersSubject.asObservable()

    }
}

