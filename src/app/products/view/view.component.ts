import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Action } from '../../shared/table/table.model';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts/release/utils';



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
    this.router.navigate(['product/add/:id'])
  }

}
