/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  keyValue= ['id','name','company']
  constructor() { }

  ngOnInit() {
  }

}
