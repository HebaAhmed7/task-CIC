import { UserModel } from '../../material/user-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  public userId = +this.activatedRoute.snapshot.params['id'];

  createFormUser() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      countryCode: new FormControl('', Validators.required),
      isActive: new FormControl(false),
    });
  }

  public async onSubmit() {
    if (this.userForm.valid) {
      const user: UserModel = this.userForm.value;
      if (this.userId) {
        this.userService.updateUser(this.userId, user);
      } else {
        this.userService.addUser(user);
      }
      await this.router.navigate(['list-users']);
    }
  }

  userDetails() {
    this.router.navigate(['/list-users']);
  }
  public ngOnInit(): void {
    this.createFormUser();
    this.checkIfUpdatingUser();
  }

  public checkIfUpdatingUser(): void {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
      });
    }
  }
}
