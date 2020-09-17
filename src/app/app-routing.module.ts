import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"Catalog", component: CatalogComponent},
  {path:"Register", component: RegisterComponent},
  {path:"Logout", component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
