import { Component, OnInit, ViewContainerRef, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products } from '../products.model';
import {DatePipe} from '@angular/common'
import { Mode, ModeEvent } from '../mode';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';






@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})


export class AddComponent implements OnInit {
  /**
   * @property productForm to add the product
   * @property numberRegEx to apply validation of number to price field
   * @property patth to take default path for evey image
   * @property fileName to concate file name with prefix path
   */
  productForm: FormGroup;
  public numberRegEx: string;
  public path: string;
  public fileName: string;
  public product=[];
  public clicked;
  public dd:any=new Date();
  conversionOutput:any;
  public incrementProductNumber:any;
  public action=[Mode.EDIT,Mode.ADD]
 
  /**
   * 
   * @param toastr to pass toast on save click
   * @param vcr container for toaster
   * @param productService inject service to use service's methods
   * @param fb to build form controls
   * @param route to activate the route
   * @param router to nevigate to other page
   */
  constructor(public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private productService: ProductsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe:DatePipe,
    
    private cd:ChangeDetectorRef
   
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.numberRegEx = '^[0-9]*$';
    this.path = '/assets/product-images/';
    this.fileName = '';
    // this.clicked=false;
  }


  ngOnInit() {
    
  this.loadForm();
  // this.getProducts();
    //this.editProducts();
    // let id=this.productForm.value.id
    // if(id!=null)
    // {
    //   this.editProducts();
    // }
    // else{
    //   this.addProducts(this.product);
    // }
  
  }

//   public getProducts()
// {
//   this.productService.getProduct().subscribe(
//     (products)=>{this.product=products;
    
//       const sliceProductNumber = this.product.slice(-1)[0].product_number;
//       console.log(sliceProductNumber);

//       // Split the Payment number
//       const splitProductNumber = sliceProductNumber.split('-');
//       const num = splitProductNumber[0];
//       console.log(splitProductNumber);
//       console.log(splitProductNumber[1]);

//       const stringToNumber = +splitProductNumber[1];
//       console.log(stringToNumber);

//       const numberIncriment = stringToNumber + 1;
//       console.log(numberIncriment);

//       const productNumber = num + '-' + numberIncriment;
//       console.log(productNumber);

//       this.incrementProductNumber = productNumber;
//       this.loadForm();
    
//     }
//   )
// }


 
 

  /**
   * form validations
   */
  public loadForm(): void {
    this.productForm = this.fb.group(
      {
        id:[""],
        product_number:[this.incrementProductNumber],
        description: ["", Validators.required],
        uom: ["", Validators.required],
        price: ["", [Validators.required, Validators.pattern(this.numberRegEx)]],
        group: ["", Validators.required],
        date:this.datePipe.transform(this.dd,'dd-MMM-yyyy'),
        image: [null]
       
      }
      
    )
   
  }

// submit(modeEvent:ModeEvent)
// {
 
//   if(modeEvent.action==Mode.EDIT)
//   {
//    console.log(modeEvent.id);
//     this.updateProducts(this.product);
   
//   }
//   else if(modeEvent.action==Mode.ADD)
//   {
//     console.log("ddd");
//     this.addProducts(this.product)
    
//   }
  
// } 


 

  /**
   * 
   * takes input from the form and subscribe the method from the service 
   * to add products
   */
  public addProducts(product): void {

    
    // product = Object.assign({}, this.productForm.value);


   product.image = this.path + this.fileName;

    
    this.productService.addProduct(product).subscribe(
      () => {
       
        this.productForm.value, console.log(this.productForm.value)
        this.router.navigate(['product/view']);
      }
    )

  }


 
  /**
   * take the snapshot of id and get data of perticular product
   * and give it to service
   */

  public editProducts(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
  
    this.conversionOutput = CryptoJS.AES.decrypt(id, "hskag").toString(CryptoJS.enc.Utf8);
    console.log( this.conversionOutput);
   
    this.productService.editProduct(parseInt(this.conversionOutput)).subscribe(
      (data) => {  this.dataLoad(data);}
      
     
     )
  }
  /**
   * 
   * @param product to store products
   *@description using patchvalue we can get the data of perticular id ,
   when form is loaded  
   */

public dataLoad(data:Products){
  
    this.productForm.patchValue(
      {
        id: data.id,
        description: data.description,
        uom: data.uom,
        price: data.price,
        group: data.group,
        image:null
       
      }
     
    )
  
    this.onFileChange(event);
    
    
  }


  /**
   * 
   * @param product stores product data 
   * @description to update the data on srvice
   */
 

  public updateProducts(product): void {
   //  this.onFileChange(event);
   product.image = this.path + this.fileName;
  
    
    console.log(product.image);
    
    this.productService.updateProduct(product).subscribe(() => {
      this.productForm.value;

      this.router.navigate(['product/view/'])
    })
  }

  /**
   * 
   * stores file name
   */
  // imagePath(event) {
    
  //   this.fileName = event.target.files[0].name;

  
  // }



onFileChange(event) {
  const reader = new FileReader();
  
  if(event.target.files && event.target.files[0]) {
    let [file] = event.target.files;
    reader.readAsDataURL(file);
    
    console.log(file);
    
    
    reader.onload = () => {
      this.productForm.patchValue({
        file: reader.result
        
      });
      console.log(file);
    
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
      file = event.target.files[0].name;
      this.fileName=file
    };
   
  }
}










  /**
   * toaster method calls when click on save button of the form
   */
  showSuccess() {

    this.toastr.success('Success!');

  }

 

    canDeactivate()
    {
      if(this.productForm==undefined)
      {
        // console.log(this.productForm);
         this.router.navigate(['/product/view'])
        // return true;
       
        
      }
      else
      {
        if(confirm('Are you sure you want to leave??'))
        {
          return true;
        }
        else 
        {
          return false;
        }
      }
    }


  }