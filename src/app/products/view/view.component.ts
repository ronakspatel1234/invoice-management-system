import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Action } from '../../shared/table/table.model';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  heading = {
    name: ["Id","Item Code","Description","U.O.M","Unit Price","Group" ],
    key: ["id","product_number","description","uom","price","group"]
  }
  public products=[];
  public action=[Action.EDIT,Action.DELETE,Action.VIEW];
  constructor(private service: ProductsService,
    private router:Router) { }

  ngOnInit() {
   
    this.getProducts();
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

  getProducts()
  {
    this.service.getProduct().subscribe(product =>{
      this.products = product;
  });
  }
  search() {

    console.log("dnsv");
    
  }

  public actionClick(EDIT,id1):void
  {
    this.router.navigate(['product/edit/'+id1])
  }

}
