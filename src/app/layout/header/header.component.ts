import { Component, OnInit , DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/_services/auth.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: Boolean;
  loggedInUser;
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private loginService: LoginComponent,
   ) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if (this.isLogged === false) {
      if (
        localStorage.hasOwnProperty('token') &&
        localStorage.hasOwnProperty('user name')
      ) {
        this.loggedInUser = localStorage.getItem('user name');
            
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    } else {
      if (
        localStorage.hasOwnProperty('token') &&
        localStorage.hasOwnProperty('user name')
      ) {
        this.loggedInUser = localStorage.getItem('user name');
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    }

  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user name');
    this.router.navigate(['/login']);
  }
}
