import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
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
  public sction=['EDIT','DELETE','VIEW']
  constructor(private service: ProductsService) { }

  ngOnInit() {
   
  //  this.getProducts();
  }

  // getProducts()
  // {
  //   this.service.getProduct().subscribe(product =>{
  //     this.products = product;
  // });
  // }
  // search() {

  //   console.log("dnsv");
    
  // }

  // public actionClick(id,id1)
  // {

  // }

}
