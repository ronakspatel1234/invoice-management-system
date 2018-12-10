/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { OrderByKey } from './order-by-keys.model';
import { Sort } from './sort.model';

@Component({
  selector: 'ims-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent implements OnInit {
  public key:string;
  public toggle=false;
  @Output() date= new EventEmitter<string>();

  @Output() export = new EventEmitter<string>();
  @Input() set OrderByKey(value)
  {
    this.key = value;
  }
  get keys()
  {
    return this.key;
  }
  @Output() sortValue = new EventEmitter<Sort[]>();
  constructor() { }

  ngOnInit() {
  }
  /**When user click on export button its give output to the parent */
  clickExport()
  {
    this.export.emit();
    console.log("clicked");
  }

  sortData(sort:Sort[])
  {
    this.sortValue.emit();
  }

}

