import { Component } from '@angular/core';
import { LoginService } from './shared/components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   *
   */
  constructor(public login : LoginService) {
    
    
  }
  title = 'Social';
}
