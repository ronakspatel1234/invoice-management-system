/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
// -------------------------------------------//
import { QuotationService } from '../../quotations/quotation.service';
import { PaymentService } from '../../payment/payment.service';
import { Payment } from './../../payment/payment.model';
import { Quotation } from './../../quotations/quotations.model';
import { CustomersService } from './../customers.service';
import { Customers } from './../customers.model';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'ims-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public customers: Customers;
  public customerData: Customers[];
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
  /** get customer detail for perticular id
   * when click on id first of all decrypt id and get data
   */
  public getCustomerById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.conversionOutput = CryptoJs.AES.decrypt(id, 'aaa').toString(CryptoJs.enc.Utf8);

    this.customerService.getByCustomer(this.conversionOutput).subscribe((customer) => {
      this.customers = customer;

    });
  }
  /** this methos get all data from the server using service */
  public getCustomers(): void {
    this.customerService.getCustomer().subscribe(customer => {
      this.getCustomer = customer;
    });
  }
 /** @param id define which record will be deleted
   * delete the record from the server */
  public deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(data => this.getCustomers());
    this.router.navigate(['customer/view']);
  }
  /** get quotation detail with customer name */
  public getQuotations(): void {
    //  this.quotationService.getQoutation()
    //  .subscribe((quotation) => {this.totalItems = quotation.length;
    //   if (this.totalItems > 0) {
    //      this.getQuotationByPagination();
    //   }
    // });

    this.quotationService.getQoutation().subscribe((qoutations) => {
      this.quotations = qoutations;
     // this.getQuotationByPagination();
      this.quotations.forEach(qoutation => {
        if (qoutation.customer_id) {
          this.quotationService.getCustomer(qoutation.customer_id).subscribe((customer: any) => {
            if (qoutation.customer_id === customer.id) {
              qoutation.customer_id = customer.name;
              // console.log(qoutation.customer_id = customer.name);
            }
          });
        }
      });
    });


  }
  /** when click on edit icon it take id
   * encrypt id and navigate it on edit page
   */
  public editCustomer(id): void {
    const encryptedId = CryptoJs.AES.encrypt(id.toString().trim(), 'aaaa').toString();
    this.router.navigate(['/customer/edit/', encryptedId]);
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
