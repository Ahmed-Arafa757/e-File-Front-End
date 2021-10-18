import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient,
  private router: Router) { }

  register(user: User) {
    return this.httpClient.post(`${this.baseUrl}user/register`, user);
  }

  login(user: User) {
    return this.httpClient.post(`${this.baseUrl}user/login`, user);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/notAuthenticated'])
      return false;
    }
  }
}
