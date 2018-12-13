/**
 * @author Sonal Prajapati
 * @description this service is used to communicate with the backend.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuotationService {
  // URL To webAPI
  readonly url = 'http://localhost:3000/quotation';

  readonly urlCustomer = 'http://localhost:3000/customer';
  constructor(private http: HttpClient) { }

  public getQoutation(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  public getCustomer(): Observable<any> {
    return this.http.get<any>(this.urlCustomer);
  }
}
