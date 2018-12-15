/**
 * @author - Shahbaz Shaikh
 * @description - This component file are add the payment.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// --------------------------------------------- //
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public sentInvoice: any[];
  public payment: Payment[];
  public paymentForm: FormGroup;
  public incrementPaymentNumber: any;
  date: Date;
  lasts: Payment[];

  constructor(private service: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.sentInvoice = [];
    this.date = new Date();
    // this.incrementPaymentNumber = 0;
  }

  ngOnInit() {
    this.getInvoice();
    this.getPayments();
    this.addPayment();
  }

  // Get only sent Invoice
  getInvoice(): void {
    this.service.getSentInvoice()
      .subscribe((sent) => {
        this.sentInvoice = sent;
    });
  }

  // Get the payment records
  getPayments(): void {
    this.service.getAllPayments()
      .subscribe((lastPayment) => {
        this.payment = lastPayment;

        // Get Last record from database and Payment Number incriment
        const slicePaymentNumber = this.payment.slice(-1)[0].payment_number;
        const splitPaymentNumber = slicePaymentNumber.split('-');
        const pays = splitPaymentNumber[0];
        const stringToNumber = +splitPaymentNumber[1];
        const numberIncriment = stringToNumber + 1;
        const payNumber = pays + '-' + numberIncriment;
        this.incrementPaymentNumber = payNumber;

      });
  }

  // Add payment reactive form
  public addPayment() {
    this.paymentForm = this.fb.group({
      invoice_id: [Validators.required],
      payment_number: [this.incrementPaymentNumber],
      date: [this.date],
    });
  }

  // Submit the form
  onSubmit(): void {
    const pay = Object.assign({}, this.paymentForm.value);
    this.service.addPayment(pay).subscribe(() => {
      // Reset the payment form
      this.updateStatus(pay);
    });
  }

  // Update the invoice status sent to Paid
  private updateStatus(pay) {
    pay.status = 'Paid';
    this.service.updateInvoiceStatus(pay).subscribe( () => {
      this.router.navigate(['/payment/view']);
    });
  }
}
