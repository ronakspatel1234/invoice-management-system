import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Customers } from '../customers/customers.model';
import { environment } from '../../environments/environment';
import { Quotation } from '../quotations/quotations.model';
import { Payment } from '../payment/payment.model';

@Injectable()
export class DashboardService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  public getCustomers(): Observable<Customers[]> {
    const url = this.baseUrl + '/customer';
    return this.http.get<Customers[]>(url);
  }
  public getInvoices(): Observable<any[]> {
    const url = this.baseUrl + '/invoice';
    return this.http.get<any[]>(url);
  }
  public getQuotations(): Observable<Quotation[]> {
    const url = this.baseUrl + '/quotation';
    return this.http.get<Quotation[]>(url);
  }
  public getPayments(): Observable<Payment[]> {
    const url = this.baseUrl + '/payment';
    return this.http.get<Payment[]>(url);

  }

}
