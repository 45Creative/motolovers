import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "../core/admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'posts',
        loadChildren: 'app/creative/posts/post.module#PostModule',
      },
      {
        path: 'profile',
        loadChildren: 'app/creative/profile/profile.module#ProfileModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class CreativeRoutingModule { }
