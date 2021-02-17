import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Commentary, Mypost } from '../shared/models/myPost.interface';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginService } from '../shared/components/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MypostService {
  posts: Observable<Mypost[]>;
  comentary: Observable<Commentary[]>;
  filePath: any;
  urlImage: Observable<string>;
  private postsCollection: AngularFirestoreCollection<Mypost>;
  private comentCollection: AngularFirestoreCollection<Commentary>;

  constructor(
    private readonly asf: AngularFirestore, 
    private storage: AngularFireStorage,
    private login : LoginService) {

    this.postsCollection = asf.collection<Mypost>('mypost');
    this.comentCollection = asf.collection<Commentary>('commetary');
    this.get();
    this.getComentary();
  }

  delete(Id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.postsCollection.doc(Id).delete();
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });

  }
 

  get(): void {
    this.posts = this.postsCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Mypost))
    );
    
  }

  getComentary(): void {
    this.comentary = this.comentCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Commentary))
    );
    
  }
  public prePost(post: Mypost, image: FileI, id?:any): void {
    this.uploadImage(post, image,id);

  }
  private uploadImage(post: Mypost, image: FileI , id?:any) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          post.tagsPost = url;
          post.imagePost = url;
          post.idUser= this.login.usuario.uid;
          post.userName= this.login.usuario.nombre;
          this.save(post,id);
          console.log('URL IMAGE', this.urlImage);
          console.log('PoST', post);
        });
      })
    ).subscribe();
  }

  save(post: any, Id?: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = Id || this.asf.createId();
        const data = { id, ...post };
        const result = await this.postsCollection.doc(id).set(data);
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }

  saveComentary(post: any, Id?: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = Id || this.asf.createId();
        const data = { id, ...post };
        const result = await this.comentCollection.doc(id).set(data);
        resolve(result);

      } catch (err) {
        reject(err.message);
      }
    });
  }
}
