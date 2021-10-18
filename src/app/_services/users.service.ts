import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'http://localhost:3000/'

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(`${this.baseUrl}users`);
  }
}
