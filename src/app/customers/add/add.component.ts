/**
 * @author Vaibhavi Prajapati
 */
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as CryptoJs from 'crypto-js';
// ------------------------------------------//
import { Mode, ModeEvent } from './../mode';
import { Customers } from './../customers.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {
  public customerForm: FormGroup;
  public addCustomers: Customers[];
  public customer: Customers;
  public createdAt: any = new Date();
  public customers: Customers[];
  public incrementCustomerNumber: any;
  public id: number;
  public conversionOutput: any;
  public mode = [Mode.ADD, Mode.Edit];
  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.addCustomers = [];
    this.customer = new Customers();

  }

  ngOnInit() {
    this.getcustomers();
    this.createForm();
     this.getCustomerById();

  }
  /** validation for form */
  public createForm(): void {
    this.customerForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      customer_number: [this.incrementCustomerNumber],
      company: ['', [Validators.pattern('^[a-zA-Z0-9]*$')]],
      group: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.maxLength(10), Validators.minLength(10)]],
       created_at: this.datePipe.transform(this.createdAt, 'dd-MMM-yyyy'),
      address: ['']
    });
  }
  /** get id from the snapshot
   * decrypt this id whatever we get
   * get Customer detail by its id
   */
   public getCustomerById(): void {
    const id = this.route.snapshot.paramMap.get('id');
     this.conversionOutput = CryptoJs.AES.decrypt(id, 'aaaa').toString(CryptoJs.enc.Utf8);
     console.log(this.conversionOutput);

     this.customerService.getByCustomer((this.conversionOutput)).subscribe(customer => this.getCustomer(customer) );
   }
    /** get customer detail by patch value */
   public getCustomer(customer: Customers): void {
    this.customer = customer;
    this.customerForm.patchValue({
      id: this.customer.id,
      name: this.customer.name,
      customer_number: this.customer.customer_number,
      company: this.customer.company,
      group: this.customer.group,
      email: this.customer.email,
      mobile_number: this.customer.mobile_number,
      created_at: this.datePipe.transform(this.createdAt, 'dd-MMM-yyyy'),
      address: this.customer.address
    });

   }
   /** this method use for getting customer details
    *
    */
   public getcustomers(): void {
    this.customerService.getCustomer()
      .subscribe((customer) => {
        this.customers = customer;

        // Get Last record from database and customer Number increament
        const sliceNumber = this.customers.slice(-1)[0].customer_number;
        const splitNumber = sliceNumber.split('-');
        const number = splitNumber[0];
        const stringToNumber = +splitNumber[1];
        const increamentNumber = stringToNumber + 1;
        const customer_number = number + '-' + increamentNumber;
        this.incrementCustomerNumber = customer_number;
        console.log(this.incrementCustomerNumber);
        this.createForm();
      });
  }
/** common method for add and edit
 * if mode is equals to add then call add method
 * else call update method
 */
 saveCustomer(mode: Mode) {

   if (mode === Mode.ADD) {
    this.addCustomer(this.addCustomers);
   } else if (mode === Mode.Edit) {
    this.updateCustomer();
    }
 }
 /** add customer detail in blank array
  * and navigate to another page
  */
  public addCustomer(addCustomers): void {

    this.customerService
      .addCustomer(this.customerForm.value)
      .subscribe(customer => {
        this.addCustomers.push(customer);
        console.log(customer);
        this.router.navigate(['customer/view']);
      });
  }
   /** update customer details */
  public updateCustomer(): void {
    this.customerService.updateCustomer(this.customerForm.value).
    subscribe(() => {this.customerForm.reset();
   console.log(this.customerForm);
   });
  }
}
