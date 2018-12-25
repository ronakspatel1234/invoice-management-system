import { Component, OnInit, ViewChild } from "@angular/core";
import { Mode } from "../../shared/item-description/item-description-data.model";
import { ItemDescriptionComponent } from "../../shared/item-description/item-description.component";

@Component({
  selector: "ims-item-des-test",
  templateUrl: "./item-des-test.component.html",
  styleUrls: ["./item-des-test.component.scss"]
})
export class ItemDesTestComponent implements OnInit {
  items: any[];
  // mode =  [Mode.Edit,Mode.Add,Mode.View];
  // mode = Mode.Add;
  mode = Mode.Edit;
  // mode = Mode.View;
  // @ViewChild(ItemDescriptionComponent) child;
  constructor() {
    this.items = [
      {
        id: 1,
        description: "sdhjgfujsyhfhjsd",
        uom: "cm",
        unitPrice: 120,
        qty: 2,
        total: 240,

      },
      {
        id: 2,
        description: "efewsf",
        uom: "meter",
        unitPrice: 320,
        qty: 1,
        total: 320
      },
      {
        id: 3,
        description: "desgwsf",
        uom: "meter",
        unitPrice: 100,
        qty: 3,
        total: 300
      }
    ];
  }

  ngOnInit() { }
  // ngAfterViewInit() {
  //   this.items = this.child.message
  // }
}