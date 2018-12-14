import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Products } from '../products.model';
// import { NgbModal} from '@ng-bootstrap/ng-bootstrap'


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
    // public modal: NgbActiveModal
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.numberRegEx = '^[0-9]*$';
    this.path = '/assets/product-images/';
    this.fileName = '';
  }
  // MODALS = {
  //   focusFirst:AddComponent ,
  //   // autofocus: NgbdModalConfirmAutofocus
  // };

  ngOnInit() {
    this.loadForm();
  }

  /**
   * form validations
   */
  public loadForm(): void {
    this.productForm = this.fb.group(
      {
        product_number:["",Validators.required],
        description: ["", Validators.required],
        uom: ["", Validators.required],
        price: ["", [Validators.required, Validators.pattern(this.numberRegEx)]],
        date:["",Validators.required],
        image: ["", Validators.required],
        group: ["", Validators.required]
      }
    )
  }

  /**
   * 
   * takes input from the form and subscribe the method from the service 
   * to add products
   */


  public addProducts(product): void {
   
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.editProduct(id).subscribe(
      (product) => { this.loadData(product) }
    )
  }
  /**
   * 
   * @param product to store products
   *@description using patchvalue we can get the data of perticular id ,
   when form is loaded  
   */
  public loadData(product: Products): void {
    this.productForm.patchValue(
      {
        id: product.id,
        description: product.description,
        uom: product.uom,
        price: product.price,
        image: product.image,
        group: product.group
      }
    )
  }

  /**
   * 
   * @param product stores product data 
   * @description to update the data on srvice
   */
  public updateProducts(product: Products): void {

    this.productService.updateProduct(product).subscribe(
      () => { this.productForm.value, console.log(this.productForm.value) }
    )
  }

  /**
   * 
   * stores file name
   */
  imagePath(event) {
    this.fileName = event.srcElement.files[0].name;
  }





  /**
   * toaster method calls when click on save button of the form
   */
  showSuccess() {

    this.toastr.success('Success!');

  }

  // cancel()
  // {
  //   if(this.productForm.value)
  //   {
  //     this.productForm.reset
  //   }
  //   else
  // }

 


}
