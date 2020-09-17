import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  users : User[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'ssn'];
  constructor(private UserService:UserService, private router:Router) { }

  ngOnInit() {
    if(!this.UserService.loggedIn) {
      this.router.navigate(['']);
      return;
    }
    this.UserService.getCatalog().subscribe(
      data => {
        console.log(data);
        this.users = [];
        if(data){
          if(this.UserService.user.role==1){
            console.log("user role: " + this.UserService.user.role);
            data.forEach(element => {
              element.ssn = "***-**-****";
              console.log(element.ssn);
              this.users.push(element);
            });
          }else if(this.UserService.user.role==2){
            console.log("admin user");
            this.users = data;
          }
        }
        console.log(this.users);
      }
    );
  }

  register() {
    this.router.navigate(['/Register'])
  }
}
