
/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrderByKey } from './order-by-keys.model';
import {  Mode } from './sort.model';
import { Key } from 'protractor';


@Component({
  selector: 'ims-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent implements OnInit {
  name: OrderByKey;
  public toggle = true;

  /**output for export button */
  @Output() exportData = new EventEmitter<string>();

  /**output for sorting value */
  @Output() sortValue = new EventEmitter<Mode[]>();

  public Mode = Mode;
  /**key set as input to the orderby element with get and set property*/
  @Input()
  set keys(value: OrderByKey) {
    this.name = value;
  }
  get keys() {
    return this.name;
  }

  constructor() {}

  ngOnInit() {

  }
  /**When user click on export button its give output to the parent */
  clickExport() {
    this.exportData.emit();

  }
  /**when user select the field its change with selected field */
  sortData(mode: Mode[]) {
    this.sortValue.emit(mode);

  }

//   sortData(btn: any, row: any): void {
//     const keyds = <Sort>{};
//     keyds.action = btn.action;

//     if (row != null) {
//         keyds.values = [];
//         btn.keys.forEach((key: any) => {
//             keyds.values.push({ key: key, value: row[key] });
//         });
//     }
//     this.sortValue.emit(keyds);
// }
  /** method for toggle up and down arrow
   * Its value can be true or false
   */
  changeArrow() {
    this.toggle = !this.toggle;
  }

}
