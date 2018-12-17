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
  public getAllPayments(): Observable<Payment[]> {
    const url = `${this.baseUrl}/${'payment'}`;
    return this.http.get<Payment[]>(url);
  }

  /**
   *  getPaidInvoice data are get the only paid data from server
   * @param id - set the paid invoice id
   */
  public getPaidInvoice(id: number): Observable<any[]> {
    const url = `${this.baseUrl}/${'invoice'}/${id}`;
    return this.http.get<any[]>(url);
  }

  /**
   * getQuotation are Sent Invoice data from server
   */
  public getQuotation(id: number): Observable<any[]> {
    const url = `${this.baseUrl}/${'quotation'}/${id}`;
    return this.http.get<any[]>(url);
  }

  /**
   * getPagination method are pagination start and end limit
   * @param page - Set the staring page
   * @param pageSize - set the page size change from user
   */
  public getPagination(page: number, pageSize: number): Observable<Payment[]> {
    const start = (page * pageSize) - pageSize;
    const end = (page * pageSize);
    const url = `${this.baseUrl}/${'payment'}?_start=${start}&_end=${end}`;
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
   * orderData method are for the short the data ascending and descending order
   */
  public orderByData(orderBy: any): Observable<any> {
    const url = `${this.baseUrl}/${'payment'}?_sort=${orderBy}`;
    return this.http.get(url);
  }
}
