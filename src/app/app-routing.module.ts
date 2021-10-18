import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContactListingComponent } from './pages/contacts/contact-listing/contact-listing.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { NotAuthenticatedComponent } from './pages/not-authenticated/not-authenticated.component';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full',
  },
  { path: 'contactList', component: ContactListingComponent, canActivate: [AuthGuardService], },
  {path: 'notAuthenticated' , component : NotAuthenticatedComponent},
  {path: '**' , component : ErrorNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
