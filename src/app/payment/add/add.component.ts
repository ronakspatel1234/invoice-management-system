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
  // public searchData: string;

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

  getInvoice(): void {
    this.service.getSentInvoice()
      .subscribe((sent) => {
        this.sentInvoice = sent;
      });
  }

  getPayments(): void {
    this.service.getAllPayments(null)
      .subscribe((lastPayment) => {
        this.payment = lastPayment;
        // console.log(this.payment.length - 1);

        // Get Last record from database
        const slicePaymentNumber = this.payment.slice(-1)[0].payment_number;
        console.log(slicePaymentNumber);

        // Split the Payment number
        const splitPaymentNumber = slicePaymentNumber.split('-');
        const pays = splitPaymentNumber[0];
        console.log(splitPaymentNumber);
        console.log(splitPaymentNumber[1]);

        const stringToNumber = +splitPaymentNumber[1];
        console.log(stringToNumber);

        const numberIncriment = stringToNumber + 1;
        console.log(numberIncriment);

        const payNumber = pays + '-' + numberIncriment;
        console.log(payNumber);

        this.incrementPaymentNumber = payNumber;
        this.addPayment();
      });
  }

  public addPayment() {
    this.paymentForm = this.fb.group({
      invoice_id: ['', [Validators.required]],
      payment_number: [this.incrementPaymentNumber],
      date: [this.date],
    });
  }

  onSubmit(): void {
    const pay = Object.assign({}, this.paymentForm.value);
    this.service.addPayment(pay).subscribe(() => {
      // Reset the payment form
      this.updateStatus(pay);
    });
  }

  private updateStatus(pay: any) {
    pay.status = 'Paid';
    this.service.updateInvoiceStatus(pay).subscribe( () => {
      this.router.navigate(['/payment/view']);
    });
  }
}
