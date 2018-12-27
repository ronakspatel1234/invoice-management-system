/**
 * @author - Shahbaz Shaikh
 * @description - This component file are display the payment data.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
// -------------------------------------- //
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {

  public payments: Payment[];
   // store the value of  action
  public heading = {
    name: ['ID', 'Payment Number', 'Document', 'Issue Date'],
    key: ['id', 'payment_number', 'invoice_id', 'date']
  };
  public totalItems = 0;
  public pageSize = 10;
  public page = 1;

  public paymentData: any;
  public invoiceData: any;
  public searchData: any[];
  public sortPayment: any[];
  public totalRecords: any[];
  constructor(private service: PaymentService, private router: Router, private http: HttpClient) {
    this.payments = [];
  }

  ngOnInit() {
    this.getPaymentWithInvoice();
    this.getAllPayment();
  }

  // New data table
  public getPaymentWithInvoice(): void {
    const data: any = [];
    this.service.getAllPayments().subscribe(payments => {
      payments.forEach(payment => {
        // console.log(payment);
        this.service.getPaidInvoice(payment.invoice_id).subscribe((invoices: any) => {
          // console.log(invoices);
          // invoices.forEach(invoice => {
          //   this.service.getQuotation(invoice.quotation_id).subscribe((quotations: any) => {
          //     console.log(quotations);
          //   });
          // });
          data.push({
            ID: payment.id, PaymentNumber:
            payment.payment_number,
            InvoiceNumber: invoices.invoice_number,
            IssueDate: payment.date,
            // Customer: customers.name,
            // quotation: quotation.grand_total,
          });

        });
      });
      console.log(data);
    });
  }

  /**
   * Get the All payment data
   */
  public getAllPayment() {
    this.service.getAllPayments().subscribe(obj => {
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
    this.service.getPagination(this.page, this.pageSize).subscribe(
      (payment) => {
        this.payments = payment;
      });
  }

   // serch box for any text search
   public search(data) {
     this.page = 1;
    this.service.searchData(data).subscribe((totalItems) => {
      this.searchData = totalItems;
      console.log(this.searchData);
      this.payments = this.searchData;
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
   * Action Click method are as per user action delete the user
   * @param id - get ID from user
   */
  public actionClick(id): void {
    alert('Are you sure you want to delete?');
    this.service.deletePayment(id)
      .subscribe(() => this.getAllPayment());
  }

  /**
   * Export the PDF Report on click Export Button
   */
  public export(): void {
    let id: any;
    let imgWidth: number;
    let pageHeight: number;
    let imgHeight: number;
    let heightLeft: number;
    let pdf: any;
    let position: number;
    // Get HTML Tag Id
    id = document.getElementById('contentToConvert');
    html2canvas(id).then(canvas => {
      // Setting For necessary opation
      imgWidth = 208;
      pageHeight = 295;
      imgHeight = canvas.height * imgWidth / canvas.width;
      heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // Setting For Landscape or Portrait, mm and A4 size page of PDF
      pdf = new jspdf('p', 'mm', 'a4');
      position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // Create a Payment Data PDF
      pdf.save('payment.pdf');
    });
  }

}
