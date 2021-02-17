import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './shared/components/login/login.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
