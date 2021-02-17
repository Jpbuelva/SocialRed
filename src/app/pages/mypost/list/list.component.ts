import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/components/login/login.service';
import { MypostService } from '../../mypost.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  posts$ = this.service.posts;
  list: any[];

  navigationExtra: NavigationExtras = {
    state: {
      value: null
    }
  };


  constructor(private router: Router,public login: LoginService, private service: MypostService) {
    
    this.posts$.subscribe(x => {
      this.list=[];
      x.forEach(item => {
        if (item.idUser === this.login.usuario.uid) {
          this.list.push(item);
        }
      });

    });
   }

  ngOnInit(): void {
  }

  edit(item: any) {
    this.navigationExtra.state.value = item;
    this.router.navigate(['edit'], this.navigationExtra);

  }
  detail(item: any) {
    this.navigationExtra.state.value = item;

    this.router.navigate(['detail'], this.navigationExtra);

  }

  async delete(id: string): Promise<void> {
    try {
      await this.service.delete(id);
      alert('Deleted');

    } catch (err) {
      console.log(err.message);

    }
    alert('delete');
  }

  create(){
    this.router.navigate(['new']);
  }
}
