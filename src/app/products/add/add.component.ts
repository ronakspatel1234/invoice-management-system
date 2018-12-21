import { Component, OnInit, ViewContainerRef, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products } from '../products.model';
import {DatePipe} from '@angular/common'
import { Mode, ModeEvent } from '../mode';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { log } from 'util';





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
  public product;
  public key;
  public dd:any=new Date();
  imageSrc;
  conversionOutput:any;
  public mode=[Mode.EDIT,Mode.ADD]
  // set productList(value:any)
  // {
  //   this.product=value;
  //   if (value) {
  //     value.forEach(element => {
  //       this.key=Object.keys(element);
  //     console.log(this.key);
      
  //     });
      
  //   }
    
  // }
  // get productList()
  // {
  //   return this.product;
  // }
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
    private http:HttpClient,
    private cd:ChangeDetectorRef
   
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.numberRegEx = '^[0-9]*$';
    this.path = '/assets/product-images/';
    this.fileName = '';
  
  }


  ngOnInit() {
    
    this.loadForm();
   this.editProducts();
  // this.submit(this.mode)
  }



 
 

  /**
   * form validations
   */
  public loadForm(): void {
    this.productForm = this.fb.group(
      {
        id:[""],
        product_number:["",Validators.required],
        description: ["", Validators.required],
        uom: ["", Validators.required],
        price: ["", [Validators.required, Validators.pattern(this.numberRegEx)]],
        group: ["", Validators.required],
        // date:this.datePipe.transform(this.dd,'dd-MMM-yyyy'),
        date:["",Validators.required],
        image: [null,Validators.required]
       
      }
      
    )
   // this.onFileChange(event)
  }

// submit(modeEvent:ModeEvent)
// {
 
//   if(Mode.EDIT==='edit')
//   {
//    // console.log(modeEvent.id);
//     this.updateProducts(this.product);
   
//   }
//   else if(Mode.ADD==='add')
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
    
 
   product.image = this.path + this.fileName;
//this.onFileChange(event)
   // console.log( product.image );
    
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
     //product.image = this.path + this.fileName;
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
  // public updateProducts(product: Products): void {

  //   this.productService.updateProduct(product).subscribe(
  //     () => { this.productForm.value, console.log(this.productForm.value) }
  //   )
  // }

  public updateProducts(product): void {
   //  this.onFileChange(event);
  // product.image = this.onFileChange(event);
  
    
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

  // onFileChange($event)
  // {
  //   if ($event.srcElement.files.length > 0)
  //   {
  //       let file: File = null;
  //       file = $event.srcElement.files[0];
  //       this.productForm.controls.image.setValue(file);
  //       this.product.content = $event.srcElement.files[0];
  //   }
  // }

  // getImage(id)
  // {
  //   this.productService.getImage(id).subscribe(
  //     (img)=>{this.product=img}
  //   )
  // }


   
  // set Image(value:any)
  // {
  //   this.imagePath=value;
  //   if (value) {
  //     value.forEach(element => {
  //       this.key=Object.keys(element);
  //     console.log(this.key);
      
  //     });
      
  //   }
    
  // }
  // get Image()
  // {
  //   return this.Image;
  // }
  
    
  

//   onFileChange(event: any): void {
    
//   // this.fileName = event.target.files.name;
//     let reader=new FileReader();
//     if (event.target.files && event.target.files.length) {
//         const [file] = event.target.files;

//        reader.readAsDataURL(file);
        
//        reader.onload=()=>{
//          this.productForm.patchValue(
//            {
//              image:reader.result
//            }
//          );
//             this.cd.markForCheck();
//        };
//     }
// }

onFileChange(event) {
  const reader = new FileReader();
  
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
    
    console.log(file);
    
    
    reader.onload = () => {
      this.productForm.patchValue({
        file: reader.result
        
      });
      console.log(file);
    
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    };
  // this.fileName = event.target.files;
  }
}



}

// onFileChange(event)
// {
//   debugger;
//   const f=new File([],"abc");
//   if(event.target.files)
//   {
//     console.log(f);
    
//     return f;
//   }
// }
// file:any;
// onFileChange(event)
// {
//  // debugger;
//    this.file = event.target.files
//   const f=new File([],this.file);
// // const f=new FileReader()
// // f.readAsDataURL(this.file[0])
//  console.log(f);
  
// }




  /**
   * toaster method calls when click on save button of the form
   */
  // showSuccess() {

  //   this.toastr.success('Success!');

  // }

 

    // canDeactivate()
    // {
    //   if(this.productForm==undefined)
    //   {
    //     // console.log(this.productForm);
    //     // this.router.navigate(['/product/view'])
    //     return true;
       
        
    //   }
    //   else
    //   {
    //     if(confirm('Are you sure you want to leave??'))
    //     {
    //       return true;
    //     }
    //     else 
    //     {
    //       return false;
    //     }
    //   }
    // }


