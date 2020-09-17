import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm : FormGroup;
  email : FormControl;
  password : FormControl;
  message : string;

  constructor(private UserService:UserService, private Router:Router) { }

  ngOnInit(): void {
    this.message = "Welcome to Student Catalog!"
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.loginForm = new FormGroup({
      email : this.email,
      password : this.password
    });
  }

  login() { 
    var user = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;
    //console.log("at login method: " + user.email + ", " + user.password);
    this.UserService.login(user).subscribe(
      (response) => {
        //console.log(response.status);
        if(response.status==200){
          console.log(response);
          this.UserService.loggedIn = true;
          this.UserService.user = response.body;
          // this.UserService.userchange.next(user.userName);
          this.Router.navigate(['/Catalog']);
        }
      }, error => {
        console.log("incorrect login");
        this.message = "Incorrect Username/Password!";
      }
    );
  }
}
