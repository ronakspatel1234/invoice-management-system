import { Customers } from './../customers.model';
import { CustomersService } from './../customers.service';
/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"
@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  key=['id','number','person','company','group','createdAt'];
  public customers :Customers[];
  constructor(private customersService :CustomersService) { }

  ngOnInit() {
    this.getCustomers();
  }
 public sort(data)
 {
   console.log("sorting......");
 }
 public export()
 {
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var imgHeight = canvas.height * imgWidth / canvas.width;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('MYPdf.pdf'); // Generated PDF
    });

 }
  getCustomers()
  {
    this.customersService.getCustomer().
    subscribe(data=>{this.customers = data;});
    console.log("aaaaa");
  }

}
