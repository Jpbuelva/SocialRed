import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Mypost } from '../shared/models/myPost.interface';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MypostService {
  posts: Observable<Mypost[]>;
  filePath: any;
  urlImage: Observable<string>;

  private postsCollection: AngularFirestoreCollection<Mypost>;
  constructor(private readonly asf: AngularFirestore, private storage: AngularFireStorage) {
    this.postsCollection = asf.collection<Mypost>('mypost');
    this.get();
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
  public prePost(post: Mypost, image: FileI): void {
    this.uploadImage(post, image);

  }
  private uploadImage(post: Mypost, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          post.tagsPost=url;
          post.imagePost=url;
          this.save(post) ;
          console.log('URL IMAGE', this.urlImage);
          console.log('PoST', post);
        });
      })
    ).subscribe();
  }

  save(post: Mypost, Id?: string): Promise<void> {
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
}
