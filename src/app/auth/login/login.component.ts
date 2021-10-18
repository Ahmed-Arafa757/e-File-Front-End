import { Injectable, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/users';
import { AuthService } from '../../_services/auth.service';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})
  
export class LoginComponent implements OnInit {


  user: User = { userName: '', password: '' };
  serverResponse = '';

  constructor(private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }



  onLogin(useR) {

    this.authService.login(useR).subscribe(
      (res) => {

        localStorage.setItem('token', res['accessToken']);
        localStorage.setItem('user name', res['UserName']);

        this.router.navigate(['/contactList']);
      },
      (err) => {

        this.serverResponse = err.error;
      },
      () => { },
    );
  }
}
