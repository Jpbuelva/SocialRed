import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mypost', loadChildren: () => import('./pages/mypost/list/list.module').then(m => m.ListModule) }, 
{ path: 'new', loadChildren: () => import('./pages/mypost/new/new.module').then(m => m.NewModule) }, 
{ path: 'edit', loadChildren: () => import('./pages/mypost/edit/edit.module').then(m => m.EditModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
