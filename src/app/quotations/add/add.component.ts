/**
 * @author Sonal Prajapati
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mode } from '../../shared/item-description/item-description-data.model';
import { QuotationService } from '../quotation.service';
import { Quotation } from '../quotations.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {
  /**
   * @property items: any model type
   */
  public items: any[];
  public quotation: Quotation;
  public customerDetails: Quotation[];
  public productDesc: any[];
  public quotationForm: FormGroup;
  private issuedate: Date;
  private expirydate: Date;
  /**
   * @property mode: give particular mode of enum which you want to apply
   */
  mode = Mode.Add;
  // mode = Mode.Edit;
  // mode = Mode.View;

  constructor(private router: Router, private service: QuotationService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.issuedate = new Date();
    this.expirydate = new Date();
  }

  ngOnInit() {
    this.getCustomer(),
    this.getProduct(),
    this.addQuotation(this.quotation);
  }
  /**
   * navigate to the view page
   */

  public addQuotation(quotation: Quotation) {
    this.quotationForm = this.fb.group({
      customer_id: ['', [Validators.required]],
      issue_date: [this.datePipe.transform(this.issuedate, 'dd-MMM-yyyy')],
      expiry_date: [this.datePipe.transform(this.expirydate, 'dd-MMM-yyyy')],
      status: ['draft'],
      grand_total: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      sgst: ['', [Validators.required]],
      cgst: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });

    // this.quotationForm.patchValue({
    //   grand_total: quotation.grand_total,
    //   discount: quotation.discount,
    //   cgst: quotation.cgst,
    //   sgst: quotation.sgst,
    //   qty: quotation.qty
    // })
  }
  
  
  onSubmit(): void {
    const qoutation = Object.assign({}, this.quotationForm.value);
    this.service.addQuotation(qoutation).subscribe(() => {
      // Reset the quotation form
      this.router.navigate(['/quotation/view']);
    });
  }
  /**
  * navigate to the view page
  */
  public onCancel() {
    confirm('Are You Sure?');
    this.router.navigate(['/quotation/view']);
  }

  getCustomer(): void {
    this.service.getCustomers().subscribe(customer => {
      this.customerDetails = customer
    });
  }

  public getProduct(): void {
    this.service.getProduct().subscribe(product => {
      this.productDesc = product;
    });
  }
}
