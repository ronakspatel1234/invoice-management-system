/**
 * @author - Shahbaz Shaikh
 * @description - This component file are add the payment.
 */
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
// --------------------------------------------- //
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';
import { DatePipe } from '@angular/common';
import { Invoice } from '../../invoices/invoices.model';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {

  public sentInvoice: Invoice[];
  public payment: Payment[];
  public paymentForm: FormGroup;
  public incrementPaymentNumber: any;
  private paymentDate: Date;
  // public searchData: string;

  constructor(private service: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.sentInvoice = [];
    this.paymentDate = new Date();
    this.toastr.setRootViewContainerRef(vcr);
    // this.incrementPaymentNumber = 0;
  }

  ngOnInit() {
    this.getInvoice();
    this.getPayments();
    this.addPayment();
  }

  getInvoice(): void {
    this.service.getSentInvoice()
      .subscribe((sent) => {
        this.sentInvoice = sent;
        console.log(this.sentInvoice);
      });
  }

  getPayments(): void {
    this.service.getAllPayments()
      .subscribe((lastPayment) => {
        this.payment = lastPayment;

        // Get Last record from database
        const lastPaymentNumber = this.payment.slice(-1)[0].payment_number;
        const splitPaymentNumber = lastPaymentNumber.split('-');
        const pays = splitPaymentNumber[0];
        const stringToNumber = +splitPaymentNumber[1];
        const numberIncriment = stringToNumber + 1;
        const payNumber = pays + '-' + numberIncriment;
        this.incrementPaymentNumber = payNumber;
      });
  }

  public addPayment() {
    this.paymentForm = this.fb.group({
      invoice_id: ['', [Validators.required]],
      payment_number: [this.incrementPaymentNumber],
      date: this.datePipe.transform(this.paymentDate, 'dd-MMM-yyyy')
    });
  }

  public onSubmit(): void {
    const pay = Object.assign({}, this.paymentForm.value);
    if (window.confirm('Are sure you want to Payment ?')) {
      this.service.addPayment(pay).subscribe(() => {
        this.updateStatus(pay);
      });
    } else {
      this.router.navigate(['/payment/view']);
    }
  }

  private updateStatus(pay: Invoice) {
    pay.status = 'Paid';
    this.service.updateInvoiceStatus(pay).subscribe(() => {
      this.showSuccess();
      this.router.navigate(['/payment/view']);
    });
  }

  public showSuccess() {
    this.toastr.success('Success!');
  }
}
