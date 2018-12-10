/**
 * @author - Shahbaz Shaikh
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ims-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input('prefix') prefix: string = "Showing";
  @Input('postfix') postfix: string = "Total Records";

  start: number = 0;
  end: number = 0;
  pageSize: number;
  currentPage: number;
  total: number;

  @Input('total')
  set TotatRecord(total: number) {
    if (total) {
      this.total = total;
    }
    else {
      this.total = 0;
    }
    this.calculate();
  }

  @Input('current')
  set CurrentPage(currentPage: number) {
    if (currentPage) {
      this.currentPage = currentPage;
    }
    else {
      this.currentPage = 0;
    }
    this.calculate();
  }

  @Input('size')
  set PageSize(pageSize: number) {
    if (pageSize) {
      this.pageSize = pageSize;
    }
    else {
      this.pageSize = 0;
    }
    this.calculate();
  }
  
  constructor() { }

  ngOnInit() {
  }

  calculate() {
    if (this.total > 0) {
      let startIndex = (this.currentPage - 1) * this.total;
      let endIndex = startIndex + this.pageSize;

      this.start = startIndex + 1;
      this.end = endIndex > this.total ? this.total : endIndex;
    }
    else {
      this.start = 0;
      this.end = 0;
    }
  }
}
