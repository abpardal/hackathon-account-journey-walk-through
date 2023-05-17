import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'hackathon-account-journey-walk-through';

  private cookie_name='';
  private all_cookies:any='';

  constructor( private cookieService:CookieService ){

  }

  setCookie(){
    this.cookieService.set('name','JourneyWalkThrough');
  }

  deleteCookie(){
    this.cookieService.delete('name');
  }

  deleteAll(){
    this.cookieService.deleteAll();
  }

  ngOnInit(): void {
    this.cookie_name=this.cookieService.get('name');
    this.all_cookies=this.cookieService.getAll();  // get all cookies object
  }

}
