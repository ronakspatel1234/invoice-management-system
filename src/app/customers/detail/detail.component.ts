import { Payment } from './../../payment/payment.model';
import { Quotation } from './../../quotations/quotations.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomersService } from './../customers.service';
import { Customers } from './../customers.model';
import * as CryptoJs from 'crypto-js';
/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../quotations/quotation.service';
import { PaymentService } from '../../payment/payment.service';

@Component({
  selector: 'ims-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public customers: Customers;
  public getCustomer: Customers[];
  public quotations: Quotation[];
  public payments: Payment[];
  public conversionOutput: any;
  public totalItems = 0;
  public page = 1;
  public pageSize = 10;
  constructor(
    private customerService: CustomersService,
    private quotationService: QuotationService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.customers = new Customers();
  }

  ngOnInit() {
    this.getCustomerById();
    this.getQuotations();
    this.getPayment();
  }
  getCustomerById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.conversionOutput = CryptoJs.AES.decrypt(id, 'aaa').toString(CryptoJs.enc.Utf8);
    console.log(this.conversionOutput);
    console.log(id);

    this.customerService.getByCustomer(this.conversionOutput).subscribe((customer) => {
      this.customers = customer;
       console.log(this.customers);
    });
  }
  /** this methos get all data from the server using service */
  getCustomers() {
    this.customerService.getCustomer().subscribe(customer => {
      this.getCustomer = customer;
    });
  }
 /** @param id define which record will be deleted
   * delete the record from the server */
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(data => this.getCustomers());
    this.router.navigate(['customer/view']);
  }
  getQuotations(): void {
     this.quotationService.getQoutation()
     .subscribe((quotation) => {this.totalItems = quotation.length;
      if (this.totalItems > 0) {
         this.getQuotationByPagination();
      }
    });

  }
  public getQuotationByPagination(): void {
    this.quotationService.getForPage(this.page, this.pageSize).subscribe(
      (quotation) => {
        this.quotations = quotation;
      });
  }
  /** this method use for howmany data display in one page */
  goToPageForQuotation(pageSize: any) {
    this.page = 1;
    this.pageSize = pageSize;
    this.getQuotationByPagination();
}
/** this method use when click on next it show other data
   * and for prev its show previous data
   */
  goNextPrevForQuotation(page: any) {
    if (page === 'next') {
      this.page++;
    } else if (page === 'prev') {
      this.page--;
    }
    this.getQuotationByPagination();
  }
  getPayment(): void {
      this.paymentService.getAllPayments()
      .subscribe((payment) => { this.totalItems = payment.length;
        if (this.totalItems > 0) {
           this.getPaymentByPagination();
        }
      });
  }
  public getPaymentByPagination(): void {
    this.paymentService.getPagination(this.page, this.pageSize).subscribe(
      (payment) => {
        this.payments = payment;
      });
  }
  /** this method use for howmany data display in one page */
  goToPageForPayment(pageSize: any) {
    this.page = 1;
    this.pageSize = pageSize;
    this.getPaymentByPagination();
}
/** this method use when click on next it show other data
   * and for prev its show previous data
   */
  goNextPrevForPayment(page: any) {
    if (page === 'next') {
      this.page++;
    } else if (page === 'prev') {
      this.page--;
    }
    this.getPaymentByPagination();
  }

}
