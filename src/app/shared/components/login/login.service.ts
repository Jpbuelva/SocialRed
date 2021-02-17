import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario: any = {};
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        debugger;
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      console.log(this.usuario.uid);


    });
  }
  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};

    this.afAuth.signOut();
  
  }
}
