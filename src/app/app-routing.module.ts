import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { UserRouterGuard } from './auth/user-router.guard';
import { SocialComponent } from './components/social/social.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"social",component:SocialComponent},
  {path:"profile",component:ProfileComponent, canActivate:[UserRouterGuard]},
  {path:"**",component:HomeComponent},
  {path:"",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
