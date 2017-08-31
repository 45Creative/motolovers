import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/creative/creative.module#CreativeModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
