import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ContactListingComponent } from './pages/contacts/contact-listing/contact-listing.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotAuthenticatedComponent } from './pages/not-authenticated/not-authenticated.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactListingComponent,
    HeaderComponent,
    NotAuthenticatedComponent,
    ErrorNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
