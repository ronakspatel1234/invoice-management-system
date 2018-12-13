import { Router } from '@angular/router';
import { Customers } from './../customers.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
   public customerForm: FormGroup;
   public addCustomers:Customers[];
  constructor(private fb:FormBuilder,
              private customerService: CustomersService,
              private router: Router) {
                this.addCustomers=[];
               }

  ngOnInit() {
    this.customerForm = this.fb.group(
      {
        name: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        company: [''],
        group: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email]],
        mobileNumber:['',[Validators.maxLength(10), Validators.minLength(10)]],
        address: [''],
        note:[''],
        GSTIN: ['']
      }
    );

  }
  addCustomer()
  {
    this.customerService.addCustomer(this.customerForm.value).subscribe(customer=>
      {this.addCustomers.push(customer);
        this.router.navigate(['customer/view']);
      });
  }

}
