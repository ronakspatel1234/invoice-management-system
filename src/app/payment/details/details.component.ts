/**
 * @author - Shahbaz Shaikh
 * @description - This component file are display the payment details.
 */
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as emailjs from 'emailjs-com';
import * as CryptoJS from 'crypto-js';
// --------------------------------------------- //
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';
import { Quotation } from '../../quotations/quotations.model';
import { Customers } from '../../customers/customers.model';


@Component({
  selector: 'ims-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public payments: Payment;
  public invoices: any;
  public quotations: any;
  public customers: any;
  public data: any[];
  public notes: string;
  public emailForm: FormGroup;
  conversionOutput: any;

  constructor(private service: PaymentService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getPaymentID();
    this.emailSendForm();
  }

  public getPaymentID(): void {
    const decryptId = this.route.snapshot.paramMap.get('id');
    const decrypt = CryptoJS.AES.decrypt(decryptId, 'hskag').toString(CryptoJS.enc.Utf8);
    const stringToNumber = +decrypt;
    const id = stringToNumber;
    this.getDetails(id);
  }

  public getDetails(id: number): void {
    this.service.getDetailById(id)
      .subscribe(payment => {
        this.payments = payment;
        console.log(payment);
        if (payment.invoice_id) {
          this.service.getPaidInvoice(payment.invoice_id).subscribe((invoice: any) => {
            this.invoices = invoice;
            console.log(invoice);
            if (invoice.quotation_id) {
              this.service.getQuotation(invoice.quotation_id).subscribe((quotation: any) => {
                this.quotations = quotation;
                console.log(quotation);
                if (quotation.customer_id) {
                  this.service.getCustomer(quotation.customer_id).subscribe((customer: any) => {
                    this.customers = customer;
                    console.log(customer);
                  });
                }
              });
            }
          });
        }
      });
  }

  public deletePayment(id: number): void {
    alert('Are you sure you want to delete Details?');
    this.service.deleteDetails(id)
      .subscribe(() => {
        this.router.navigate(['payment/view']);
      });
  }

  /**
    * Export the PDF Report on click Export Button
    */
  public exportReport(): void {
    // Get HTML Tag Id
    const id = document.getElementById('contentToConvert');
    html2canvas(id).then(canvas => {
      // Setting For necessary opation
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      // Setting For Landscape or Portrait, mm and A4 size page of PDF
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // Create a Payment Data PDF
      pdf.save('invoice-details.pdf');
    });
  }

  public emailSendForm() {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required]],
      bcc: [''],
      subject: [''],
      message: ['']
    });
  }

  public sendEmail(emailForm) {

    this.notes = 'Check this out!';

    emailjs.sendForm('gmail', 'template_8q7PcPIY', '#myForm', 'user_Kx7H2nL1sotv0nD8WzUrB')
      .then((response) => {
        alert('Email Send SUCCESS!');
        this.emailForm.reset();
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  }
}
