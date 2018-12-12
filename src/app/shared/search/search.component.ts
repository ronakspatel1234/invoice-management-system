/**
 * @author Akshita Kapadia
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ims-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchClick;
  constructor() {
    this.searchClick = new EventEmitter();
  }

  ngOnInit() {
  }

  data:any;

  /**
   * emits an event called searchClick
   * and pass it to parent component
   */
  public search(data) {
    this.searchClick.emit();
    
   console.log(this.data);
   

  }

}
