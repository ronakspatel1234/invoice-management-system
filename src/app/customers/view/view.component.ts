/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  key=['id','name']
  constructor() { }

  ngOnInit() {
  }
 public sort(data)
 {
   console.log("sorting......");
 }
 public export(data)
 {
   console.log("export......");
 }
}
