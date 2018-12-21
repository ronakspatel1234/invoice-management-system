/**
 * @author - Shahbaz Shaikh
 * @description - This service file are communication between component to server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// --------------------------------- //
import { environment } from '../../environments/environment';
import { Payment } from './payment.model';
import { Invoice } from '../invoices/invoices.model';
import { Quotation } from '../quotations/quotations.model';
import { Customers } from '../customers/customers.model';

@Injectable()
export class PaymentService {

  // Declare the URL for server
  private baseUrl: string;

  constructor(private http: HttpClient) {
    // Define the URL for server
    this.baseUrl = environment.baseUrl;
  }

  /**
   * getAllPayment Method are get all payment data from user
   */
  public getAllPayments(data: any): Observable<Payment[]> {
    let url = `${this.baseUrl}/${'payment'}`;
    if (data && data !== '') {
      url = url.concat(`?q=${data}`);
    }
    return this.http.get<Payment[]>(url);
  }

  /**
   *  getPaidInvoice data are get the only paid data from server
   * @param id - set the paid invoice id
   */
  public getPaidInvoice(id: number): Observable<Invoice> {
    const url = `${this.baseUrl}/${'invoice'}/${id}`;
    return this.http.get<Invoice>(url);
  }

  /**
   * getQuotation are Sent Invoice data from server
   */
  public getQuotation(id: number): Observable<Quotation> {
    const url = `${this.baseUrl}/${'quotation'}/${id}`;
    return this.http.get<Quotation>(url);
  }

  public getCustomer(id: number): Observable<Customers> {
    const url = `${this.baseUrl}/${'customer'}/${id}`;
    return this.http.get<Customers>(url);
  }
  /**
   * getPagination method are pagination start and end limit
   * @param page - Set the staring page
   * @param pageSize - set the page size change from user
   */
  public getPagination(page: number, pageSize: number, data: any): Observable<Payment[]> {
    const start = (page * pageSize) - pageSize;
    const end = (page * pageSize);
    let url = `${this.baseUrl}/${'payment'}?_start=${start}&_end=${end}`;
    if (data && data !== '') {
      url = url.concat(`&q=${data}`);
    }
    return this.http.get<Payment[]>(url);
  }

  /**
   * getSentInvoice method are get the only sent invoice data from server
   */
  public getSentInvoice(): Observable<any[]> {
    const url = `${this.baseUrl}/${'invoice'}?status=${'Sent'}`;
    return this.http.get<any[]>(url);
  }

  /**
   * addPayment method are add new payment in server
   * @param payment - get the payment data
   */
  public addPayment(payment: Payment): Observable<Payment> {
    const url = `${this.baseUrl}/${'payment'}`;
    return this.http.post<Payment>(url, payment);
  }

  /**
   * updateInvoiceStatus method are successfully add data after invoice status update
   * From Sent To Paid
   * @param invoice - Update Invoice status
   */
  public updateInvoiceStatus(invoice: any): Observable<any> {
    const requestBody = {
      status: invoice.status
    };
    const url = this.baseUrl + '/invoice' + '/' + invoice.invoice_id;
    return this.http.patch<any>(url, requestBody);
  }

  /**
   * deletePayment method are used for delete the record from view
   * @param id - delete the record as per user ID
   */
  public deletePayment(id: any): Observable<Payment[]> {
    const url = `${this.baseUrl}/${'payment'}/${id.id}`;
    return this.http.delete<Payment[]>(url);
  }

  /**
   * searchData method are serach data on server
   */
  public searchData(data: any): Observable<any> {
    const url = `${this.baseUrl}/${'payment'}?q=${data}`;
    return this.http.get<any>(url);
  }

  /**
   * sortData method are create for sorting record
   */
  public sortData(id: number, order: string): Observable<Payment[]> {
    order = 'DESC';
    const url = `${this.baseUrl}/${'payment'}?_sort=${id}&_order=${order}`;
    return this.http.get<Payment[]>(url);
  }

  public getDetailById(id: number): Observable<Payment> {
    const url = `${this.baseUrl}/${'payment'}/${id}`;
    return this.http.get<Payment>(url);
  }

  public deleteDetails(id: any): Observable<any> {
    const url = `${this.baseUrl}/${'payment'}/${id}`;
    return this.http.delete<any>(url);
  }
}
