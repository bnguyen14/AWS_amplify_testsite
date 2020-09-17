import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  message : string;
  registerForm : FormGroup;
  email : FormControl;
  firstName : FormControl;
  lastName : FormControl;
  ssn : FormControl;
  password : FormControl;
  passConfirm : FormControl;

  constructor(private UserService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.message = "Register Student";
    this.email = new FormControl('');
    this.firstName = new FormControl('');
    this.lastName = new FormControl('');
    this.ssn = new FormControl('');
    this.password = new FormControl('');
    this.passConfirm = new FormControl('');
    this.registerForm = new FormGroup({
      email : this.email,
      firstName : this.firstName,
      lastName : this.lastName,
      ssn : this.ssn,
      password : this.password,
      passConfirm : this.passConfirm
    });
  }

  register(){
    if(this.registerForm.value.password==this.registerForm.value.passConfirm){
      var user = new User();
      user.role = 1;
      user.email = this.registerForm.value.email;
      user.firstName = this.registerForm.value.firstName;
      user.lastName = this.registerForm.value.lastName;
      user.ssn = this.registerForm.value.ssn;
      user.password = this.registerForm.value.password;
      this.UserService.register(user).subscribe(
        (response) => {
          if(response.status==200){
            this.router.navigate(['/Catalog']);
          }else{
            if(response.body.email && response.body.ssn){
              this.message="email and ssn are taken";
            }else if(response.body.email){
              this.message="email is taken";
            }else{
              this.message="ssn is taken";
            }
          }
        }, error => {
          this.message = "unable to register student";
        }
      )
    }else{
      this.message="passwords do not match!";
    }
  }
}
