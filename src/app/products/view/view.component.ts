import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Action, ActionEvent } from '../../shared/table/table.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"
import { Products } from '../products.model';
import * as CryptoJS from 'crypto-js';

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
  public products:Products[];
  public totalItems = 0;
  public pageSize = 10;
  public page = 1;
  public searchData:string;
  public searchResult:Products[];
  public orderResult:Products[];
  conversionOutput: any;
  public action=[Action.EDIT,Action.DELETE,Action.VIEW];



  constructor(private service: ProductsService,
    private router:Router,
    private route:ActivatedRoute) {
      this.searchResult = [];
      this.orderResult=[];
      this.products=[];
     }

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
 
 sort(orderBy) {
  this.service.orderByProduct(orderBy).subscribe((totalItems) => {
    this.orderResult = totalItems
      
    });
  }


  getProducts()
  {

    this.service.getProduct().subscribe(product =>{
      this.totalItems = product.length;
      if (this.totalItems > 0){
      this. getPage();
      }
  });
  }

  public getPage(): void {
 this.service.getPagination(this.page,this.pageSize,this.searchData).subscribe(
   (obj)=>{this.products=obj}
 )
  }



  goToPage(pageSize: number): void {
   // debugger;
    //this.searchResult;
   
    this.page = 1;
    this.pageSize = pageSize;
   
   this.getPage();
  
  }

  goNextPrev(page: any): void {
    if (page === 'next') {
      this.page++;
    } else if (page === 'prev') {
      this.page--;
    }
    this.getPage();
  }

  search(search) {
    // this.service.searchData(search).subscribe((data) => {
    //   this.searchResult = data;
    
    //   console.log(this.searchResult);
    //   this.products = this.searchResult;
      this.searchData=search;
     this.getProducts();
    }
  

  public actionClick(actionEvent:ActionEvent):any
  { 
    

    if(actionEvent.action===Action.EDIT)
    {
    let encryptedId = CryptoJS.AES.encrypt( actionEvent.id.toString().trim(),"hskag").toString();
    this.router.navigate(['/product/edit/',encryptedId]);
    }
   else if(actionEvent.action===Action.VIEW)
   {
   let encryptedId = CryptoJS.AES.encrypt( actionEvent.id.toString().trim(),"hskag").toString();
    this.router.navigate(["/product/details/",encryptedId])
   }
  else if(actionEvent.action===Action.DELETE){
     this.deleteProducts(actionEvent.id);
    }

  }

  public deleteProducts(id:number):void{
    this.service.deleteProduct(id).subscribe(()=>this.getProducts() );
    
   }



}
