import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../products.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'ims-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  
 public  products:Products;
 public getProduct:Products[];
 public conversionOutput:any
  constructor(private service:ProductsService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.getByProductId();
    
  }

  getByProductId()
  {
    const id=this.route.snapshot.paramMap.get('id')
    this.conversionOutput = CryptoJS.AES.decrypt(id, "hskag").toString(CryptoJS.enc.Utf8);
    console.log(this.conversionOutput);
    this.service.getById(this.conversionOutput).subscribe(
      (product)=>{this.products=product}
    )

  }

  getProducts()
  {
    this.service.getProduct().subscribe(
      (product)=>{this.getProduct=product}
    )
  }

  public deleteProducts(id:number):void
  {
      this.service.deleteProduct(id).subscribe(()=>this.getProducts() );
      this.router.navigate(['/product/view'])
  }






}
