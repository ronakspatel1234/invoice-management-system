/**
 * @author - Ronak Patel.
 * @description - create class for topbar.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ims-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  // user logout purpose.
  public logout(): void {
    localStorage.removeItem('token');
    alert('successfully logout');
    if (localStorage == null) {
      this.router.navigate(['login']);
    }
  }
}
