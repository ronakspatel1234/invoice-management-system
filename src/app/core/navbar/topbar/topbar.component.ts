/**
 * @author - Ronak Patel.
 * @description -
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ims-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }
  public logout(): void {
    localStorage.removeItem('token');
  }
}
