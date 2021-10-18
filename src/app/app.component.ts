import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'efile-app';

  constructor(private router: Router,) { }
  
  ngOnInit() {
    if (
      localStorage.hasOwnProperty('token')
      &&
      localStorage.hasOwnProperty('user name')
    ) {
      this.router.navigate(['/contactList'])
      
    }
  }
}
