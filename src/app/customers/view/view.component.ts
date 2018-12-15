/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  key = ['id', 'name'];
  constructor() { }

  ngOnInit() {
  }
  public sort(data) {
    console.log('sorting......');
  }
  public export(data) {
    {
    }
  }
}
