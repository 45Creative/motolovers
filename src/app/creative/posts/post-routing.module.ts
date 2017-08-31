import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent, PostListComponent, PostListItemComponent, PostConfirmDeleteComponent } from "./components";

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: PostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PostRoutingModule { }
