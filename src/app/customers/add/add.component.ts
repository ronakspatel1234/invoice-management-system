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
     this.getCustomerById();
    this.customerForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      customer_number: this.incrementCustomerNumber,
      company: ['', [Validators.pattern('^[a-zA-Z0-9]*$')]],
      group: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      created_at: this.datePipe.transform(this.createdAt, 'dd-MMM-yyyy'),
      address: ['']
    });
  }
   getCustomerById(): void {
    const id = this.route.snapshot.paramMap.get('id');
     this.conversionOutput = CryptoJs.AES.decrypt(id, 'aaaa').toString(CryptoJs.enc.Utf8);
     console.log(this.conversionOutput);

     this.customerService.getByCustomer((this.conversionOutput)).subscribe(customer => this.getCustomer(customer) );
   }

   getCustomer(customer: Customers) {
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
    console.log(this.customer);

   }
  getcustomers(): void {
    this.customerService.getCustomer()
      .subscribe((customer) => {
        this.customers = customer;

        // Get Last record from database and Payment Number incriment
        const sliceNumber = this.customers.slice(-1)[0].customer_number;
        const splitNumber = sliceNumber.split('-');
        const number = splitNumber[0];
        const stringToNumber = +splitNumber[1];
        const increamentNumber = stringToNumber + 1;
        const customer_number = number + '-' + increamentNumber;
        this.incrementCustomerNumber = customer_number;

      });
  }

 saveCustomer(mode: Mode) {

   if (mode === Mode.ADD) {
    this.addCustomer();
   } else if (mode === Mode.Edit) {
    this.updateCustomer();
    }
 }
  addCustomer(): void {
    this.customerService
      .addCustomer(this.customerForm.value)
      .subscribe(customer => {
        this.addCustomers.push(customer);
        this.router.navigate(['customer/view']);
      });
  }
  updateCustomer(): void {
    this.customerService.updateCustomer(this.customerForm.value).
    subscribe(() => {this.customerForm.reset();
   console.log(this.customerForm);
   });
  }
}
