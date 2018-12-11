import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ims-item-des-test",
  templateUrl: "./item-des-test.component.html",
  styleUrls: ["./item-des-test.component.scss"]
})
export class ItemDesTestComponent implements OnInit {
  data: any[];
 
  constructor() {
    this.data = [
      {
        description: "sdhjgfujsyhfhjsd",
        uom: "cm",
        unitPrice: 120,
        qty: 2,
        total: 240
      },
      {
        description: "efewsf",
        uom: "meter",
        unitPrice: 320,
        qty: 1,
        total: 320
      }
    ];
  }

  ngOnInit() {}
}
