import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn : boolean = false;
  user : User;
  constructor(private httpClient : HttpClient, private router : Router) { }

  login(user:User) {
    //console.log("user object: " + user);
    //console.log("front end: " + user.email + "," + user.password);
    return this.httpClient.post<User>('http://localhost:8088/user/login',user,{observe: 'response'});
    // this.httpClient.post('http://localhost:8088/user/login',user).subscribe(
    //   (data : number) => {
    //     console.log(data);
    //     if(data==1){
    //       this.loggedIn = true;
    //       this.userchange.next(user.userName);
    //       this.router.navigate(['/Home']);
    //     }
    //   }, error => {
    //     console.log(error)
    //   }
    // );
  }

  logout(){
    this.loggedIn = false;
    this.user = null;
    // this.userchange.next('');
  }

  register(user:User){
    console.log("front end: " + user.firstName + "," + user.lastName + "," + user.ssn);
    return this.httpClient.post<User>('http://localhost:8088/user/register',user,{observe: 'response'});
  }

  getCatalog(){
    return this.httpClient.get<User[]>('http://localhost:8088/user/getStudents');
  }
}
