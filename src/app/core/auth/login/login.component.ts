/**
 * @author - Ronak Patel.
 * @description -
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ims-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userEmail;
  public userPassword;
  constructor() { }

  ngOnInit() {
  }
  onSubmit()
  {}
}
