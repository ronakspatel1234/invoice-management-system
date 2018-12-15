/**
 * @author Vaibhavi Prajapati
 */
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// ---------------------------------------//
import { Customers } from './customers.model';

@Injectable()
export class CustomersService {
 /**URL for web API */
  public customerURL = 'http://localhost:3000/customer';

  constructor(private http: HttpClient) {}
  /**
   * @description this method add customer dada
   * @param customer take model type
   * its takes customer and url and send to the server
   */
  public addCustomer(customer: Customers): Observable<any> {
    return this.http.post<any>(this.customerURL, customer);
  }
   /**
   * @description this method get customer dada
   * its takes url and send to the server
   */
  getCustomer(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.customerURL);
  }
}
