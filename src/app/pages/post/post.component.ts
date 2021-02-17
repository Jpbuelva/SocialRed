import { MypostService } from './../mypost.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mypost } from 'src/app/shared/models/myPost.interface';
import { LoginService } from 'src/app/shared/components/login/login.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 
  formSave: FormGroup;
  postObj: Mypost[];
  listCommentary: [];
  t;
  posts$ = this.service.posts;
  comentary$ = this.service.comentary;
  constructor(
    private service: MypostService,
    public login: LoginService,
    private fb: FormBuilder, db: AngularFirestore) {
    this.initForm();
   
  }

  ngOnInit(): void {
console.log('Comentarios' , this.comentary$)
  }

  onSave(item: any) {

    if (this.formSave.valid) {
      const post = this.formSave.value;
      const listCommentary = {
        idPost: item.id,
        commentary: post.cometary,
        userid: this.login.usuario.uid,
        nameUse: this.login.usuario.nombre

      }
      const id = null;
      this.service.saveComentary(listCommentary, id);
      this.formSave.reset();
    }

  }
  private initForm(): void {
    this.formSave = this.fb.group({
      cometary: ['', [Validators.required]],

    });
  }
}
