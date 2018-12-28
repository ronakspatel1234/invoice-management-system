/**
 * @author - Shahbaz Shaikh
 * @description - This component file are display the payment data.
 */
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as CryptoJS from 'crypto-js';
import { ToastsManager } from 'ng2-toastr';
// -------------------------------------- //
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';
import { Action, ActionEvent } from '../../shared/table/table.model';
import { Invoice } from '../../invoices/invoices.model';
import { Quotation } from '../../quotations/quotations.model';
import { Customers } from '../../customers/customers.model';
import { CustomCurrencyPipe } from '../../shared/custome-currency.pipe';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit, OnDestroy {

  public payments: Payment[];
  public data: any[];
  public action = [Action.VIEW, Action.DELETE];
  // store the value of  table data
  public heading = {
    name: ['ID', 'Payment Number', 'Invoice Number', 'Issue Date', 'Customer', 'Amount'],
    key: ['id', 'payment_number', 'invoice_number', 'date', 'Customer', 'quotation']
  };

  // Store the value soting key
  public sorting = {
    key: ['id', 'payment_number', 'date']
  };
  public totalItems: number;
  public pageSize: number;
  public page: number;
  public searchData: string;
  public sortColumn: string;
  public orderBy: string;
  public customCurrency: any;
  private paymentSubscription: Subscription;

  constructor(private service: PaymentService,
    private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.totalItems = 0;
    this.pageSize = 10;
    this.page = 1;
    this.payments = [];
    this.toastr.setRootViewContainerRef(vcr);
    this.customCurrency = new CustomCurrencyPipe();
  }

  ngOnInit() {
    this.getPayment();
  }

  /**
   * Get the Pagination configuration of start page and Page size.
   */
  public getPayment(): void {
    this.paymentSubscription = this.service.getPayment(this.page, this.pageSize, this.searchData, this.sortColumn, this.orderBy)
        .subscribe( (response) => {
            this.totalItems = response.headers.get('X-Total-Count');
            if (this.totalItems > 0) {
              this.getPaymentWithInvoice(response.body);
            }
        });
  }

  public getPaymentWithInvoice(payments: Payment[]) {
    this.data = [];
    payments.forEach((payment: Payment) => {
      this.service.getInvoice(payment.invoice_id).subscribe((invoice: Invoice) => {
        this.service.getQuotation(invoice.quotation_id).subscribe((quotation: Quotation) => {
          this.service.getCustomer(quotation.customer_id).subscribe((customer: Customers) => {
            const obj = {
              id: payment.id,
              payment_number: payment.payment_number,
              invoice_number: invoice.invoice_number,
              date: payment.date,
              Customer: customer.name,
              quotation: quotation.grand_total
            };
            this.data.push(obj);
          });
        });
      });
    });
  }

  // serch box for any text search
  public search(e: string) {
    this.searchData = e;
    this.getPayment();
  }

  // Sort data acceding order and descending order
  public sort(e): void {
    this.page = 1;
    this.getPayment();
  }


  /**
   * Page size change as per user select
   * @param pageSize - Get the page size of select from user
   */
  goToPage(pageSize: number): void {
    this.page = 1;
    this.pageSize = pageSize;
    this.getPayment();
  }

  /**
   * User next and previous page
   * @param page - Get the request from click the user next or previous button
   */
  goNextPrev(page: string): void {
    if (page === 'next') {
      this.page++;
    } else if (page === 'prev') {
      this.page--;
    }
    this.getPayment();
  }

  /**
   * Export the PDF Report on click Export Button
   */
  public export(): void {
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
      pdf.save('payment.pdf');
    });
  }

  public actionClick(actionEvent: ActionEvent): void {
    // console.log(actionEvent.id);
    if (actionEvent.action === Action.DELETE) {
      this.deletePayment(actionEvent);
    } else if (actionEvent.action === Action.VIEW) {
      this.goToDetails(actionEvent);
    }
  }

  public deletePayment(actionEvent: ActionEvent): void {
    if (window.confirm('Are sure you want to delete this Record ?')) {
      this.service.deletePayment(actionEvent)
        .subscribe(() => this.getPayment());
    } else {
      this.router.navigate(['/payment/view']);
    }
  }

  public goToDetails(actionEvent: ActionEvent): void {
    const encryptedId = CryptoJS.AES.encrypt(actionEvent.id.toString().trim(), 'hskag').toString();
    this.router.navigate(['/payment/details/', encryptedId]);
  }


  ngOnDestroy() {
    this.paymentSubscription.unsubscribe();
  }
}
