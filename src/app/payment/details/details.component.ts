/**
 * @author - Shahbaz Shaikh
 * @description - This component file are display the payment details.
 */
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as emailjs from 'emailjs-com';
import * as CryptoJS from 'crypto-js';
import { ToastsManager } from 'ng2-toastr';
// --------------------------------------------- //
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';
import { Quotation } from '../../quotations/quotations.model';
import { Customers } from '../../customers/customers.model';
import { Invoice } from '../../invoices/invoices.model';


@Component({
  selector: 'ims-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  /**
   * Declear the variable
   */
  public payments: Payment;
  public invoices: Invoice;
  public quotations: Quotation;
  public customers: Customers;
  public emailForm: FormGroup;

  /**
   * Inject the service
   * @param service - for payment service
   * @param fb - for usnig form builder in reactive forms
   * @param route - for using one page to another page routing
   * @param router - for using one page to another page routing
   * @param toastr - for using show the toastr message
   * @param vcr - for using toaster message
   */
  constructor(private service: PaymentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getPaymentID();
    this.emailSendForm();
  }

  /**
   * getPaymentID method are used for get the URL id
   * And encrypt to decrypt id using cryptoJS
   */
  public getPaymentID(): void {
    const decryptId = this.route.snapshot.paramMap.get('id');
    const decrypt = CryptoJS.AES.decrypt(decryptId, 'hskag').toString(CryptoJS.enc.Utf8);
    const stringToNumber = +decrypt;
    const id = stringToNumber;
    /**
     * Send the id to getDetails method
     */
    this.getDetails(id);
  }

  /**
   * get the payment deastils
   * @param id - Get the id
   */
  public getDetails(id: number): void {
    this.service.getDetailById(id)
      .subscribe((payment: Payment) => {
        this.payments = payment;
        if (payment.invoice_id) {
          this.service.getInvoice(payment.invoice_id).subscribe((invoice: Invoice) => {
            this.invoices = invoice;
            if (invoice.quotation_id) {
              this.service.getQuotation(invoice.quotation_id).subscribe((quotation: Quotation) => {
                this.quotations = quotation;
                if (quotation.customer_id) {
                  this.service.getCustomer(quotation.customer_id).subscribe((customer: Customers) => {
                    this.customers = customer;
                  });
                }
              });
            }
          });
        }
      });
  }

  public deletePayment(id: number): void {
    if (window.confirm('Are sure you want to delete this Record ?')) {
      this.service.deleteDetails(id)
        .subscribe(() => {
          this.router.navigate(['/payment/view']);
        });
    } else {
      this.showError();
    }
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
      this.showSuccess();
    });
  }

  public emailSendForm() {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      bcc: [''],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  public sendEmail() {

    emailjs.sendForm('gmail', 'template_ybU0VJ3l', '#myForm', 'user_xHGNb160hX3bcqvqcMRmf')
      .then((response) => {
        alert('Email Send SUCCESS!');
        this.showSuccess();
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        this.showError();
        console.log('FAILED...', err);
      });
  }

  public showSuccess() {
    this.toastr.success('Success!');
  }

  public showError() {
    this.toastr.error('Oops!');
  }
}
