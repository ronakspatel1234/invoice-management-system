/**
 * @author - Shahbaz Shaikh
 * @description - This component file are display the payment data.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as CryptoJS from 'crypto-js';
// -------------------------------------- //
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';
import { Action, ActionEvent } from '../../shared/table/table.model';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {

  public payments: Payment[];
  public data: any[];
  public action = [Action.VIEW, Action.DELETE];
  // store the value of  action
  public heading = {
    name: ['ID', 'Payment Number', 'Invoice Number', 'Issue Date', 'Customer', 'Amount'],
    key: ['id', 'PaymentNumber', 'InvoiceNumber', 'IssueDate', 'Customer', 'quotation']
  };
  public totalItems = 0;
  public pageSize = 10;
  public page = 1;
  public searchData: string;
  constructor(private service: PaymentService, private router: Router) {
    this.payments = [];
  }

  ngOnInit() {
    this.getAllPayment();
  }

  /**
   * Get the All payment data
   */
  public getAllPayment() {
    this.service.getAllPayments(this.searchData).subscribe(obj => {
      this.totalItems = obj.length;
      if (this.totalItems > 0) {
        this.getPayment();
      }
    });
  }

  /**
   * Get the Pagination configuration of start page and Page size.
   */
  public getPayment(): void {
    this.service.getPagination(this.page, this.pageSize, this.searchData).subscribe(
      (payments) => {
        this.getNSetNestedPaymentData(payments);
      });
  }

  getNSetNestedPaymentData(payments:Payment[])
  {
    this.data = [];
    payments.forEach(payment => {
      this.service.getPaidInvoice(payment.invoice_id).subscribe(invoice => {
        this.service.getQuotation(invoice.quotation_id).subscribe(quotation => {
          this.service.getCustomer(quotation.customer_id).subscribe(customer => {
            const obj = {
              id: payment.id,
              PaymentNumber: payment.payment_number,
              InvoiceNumber: invoice.invoice_number,
              IssueDate: payment.date,
              Customer: customer.name,
              quotation: quotation.grand_total
            };
            this.data.push(obj);
            // this.totalItems = this.totalItems + 1;
          });
        });
      });
    });
  }

   // serch box for any text search
   public search(e) {
     this.searchData = e;
     this.getAllPayment();
  }

  // Sort data acceding order and descending order
  public sort(e): void {
    this.data = this.data.sort((a: any, b: any) => {
      let val1;
      let val2;
      if (e['value'] === 'IssueDate') {
        val1 = new Date(a[e['value']]);
        val2 = new Date(b[e['value']]);
      } else {
        val1 = a[e['value']];
        val2 = b[e['value']];
      }
      if (val1 < val2) {
        return e['mode'] === 'ASC' ? -1 : 1;
      }
      if (val1 > val2) {
        return e['mode'] === 'ASC' ? 1 : -1;
      }
      return 0;
    });
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
  goNextPrev(page: any): void {
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
    console.log(actionEvent.id);
    if (actionEvent.action === Action.DELETE) {
      this.deletePayment(actionEvent);
    } else if (actionEvent.action === Action.VIEW) {
      this.goToDetails(actionEvent);
    }
  }

  public deletePayment(actionEvent: ActionEvent): void {
    alert('Are you sure you want to delete?');
    console.log(actionEvent.id);
    this.service.deletePayment(actionEvent)
     .subscribe(() => this.getAllPayment());
  }

  public goToDetails(actionEvent: ActionEvent): void {
    const encryptedId = CryptoJS.AES.encrypt(actionEvent.id.toString().trim(), 'hskag').toString();
    this.router.navigate(['/payment/details/', encryptedId]);
  }
}
