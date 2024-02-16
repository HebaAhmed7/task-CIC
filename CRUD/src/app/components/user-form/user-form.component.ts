import { UserModel } from './../../material/user-model';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
 userForm:FormGroup
  constructor(

    private router:Router ,
    private userService:UserService
    ){}

 createFormUser(){
  this.userForm = new FormGroup({
     firstName : new FormControl('',Validators.required),
     lasName : new FormControl('',Validators.required),
     barthDate : new FormControl('',Validators.required),
     phoneNumber : new FormControl('',Validators.required),
     countryCode : new FormControl('',Validators.required),
     isActive : new FormControl(false)

  })
}


 onSubmit(){
  if(this.userForm.valid){
   const user: UserModel = this.userForm.value;
      this.userService.addUser(user);
      this.userForm.setValue(user);
      console.log(user)
  }

 }



userDetails(){
this.router.navigate(['/list-users'])
}
ngOnInit(): void {
  this.createFormUser()
}
}
