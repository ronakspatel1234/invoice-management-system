import { Observable } from 'rxjs/Observable';
import { Customers } from './customers.model';
import { HttpClient } from '@angular/common/http';
/**
 * @author Vaibhavi Prajapati
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CustomersService {
   public customerURL="http://localhost:3000/customer";

  constructor(private http:HttpClient) { }
   addCustomer(customer:Customers):Observable<any>
  {
      return this.http.post<any>(this.customerURL,customer)
  }
}
