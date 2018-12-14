/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrderByKey } from './order-by-keys.model';
import { Sort } from './sort.model';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  @Output() sortValue = new EventEmitter<Sort[]>();

  /**key set as input to the orderby element with get and set property*/
  @Input()
  set keys(value: OrderByKey) {
    this.name = value;
  }
  get keys() {
    return this.name;
  }

  constructor() { }

  ngOnInit() {

  }
  /**When user click on export button its give output to the parent */
  clickExport() {
    this.exportData.emit();
    console.log('clicked');
  }
  /**when user select the field its change with selected field */
  sortData(sort: Sort[]) {
    this.sortValue.emit(sort);
    console.log('sort');
  }

  // public onSubmit(data) {
  //   let dateFormatChange =
  //     data.date.day +
  //   '/' +
  //   data.date.month +
  //   '/' +
  //   data.date.year;
  //   console.log(data);

  //   data.date= dateFormatChange;
  //    console.log(data.date);
  // }
  /** method for toggle up and down arrow
   * Its value can be true or false
   */
  changeArrow() {
    this.toggle = !this.toggle;
  }
}
