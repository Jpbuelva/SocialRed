import { Component, OnInit } from '@angular/core'; 
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {

    constructor( public loginService: LoginService) { }
  ingresar( ) {

    this.loginService.login();

  }

}
