/**
 * @author Sonal Prajapati
 * @description this service is used to communicate with the component and backend.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Customers } from '../customers/customers.model';
import { Quotation } from './quotations.model';

@Injectable()
export class QuotationService {
  // URL To webAPI
  readonly url: string;
  /**
   * @param http -Inject httpClient service for server interaction.
   */
  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;

  }
/**
 * @description use for get th qoutation list
 */
  public getQoutation(): Observable<Quotation[]> {
    const url = this.url + '/quotation';
    return this.http.get<Quotation[]>(url);
  }
  public getCustomer(): Observable<Customers[]> {
    const url = this.url + '/customer';
    return this.http.get<Customers[]>(url);
  }
}
