
/**
 * @author Vaibhavi Prajapati
 */
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// ---------------------------------------//
import { Customers } from './customers.model';
import { environment } from './../../environments/environment';

@Injectable()
export class CustomersService {
  /**URL for web API */
  public customerURL = environment.baseUrl + '/customer';
  public paginationURL: any;
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
  /**@param id define the id of the record
   * it take id and call the server for delete record
    */
  deleteCustomer(id: number): Observable<Customers[]> {
    const url = `${this.customerURL}/${id}`;
    if ( confirm('are you sure you want to delete it ??')) {
    return this.http.delete<Customers[]>(url);
  }
  }
  /** @param id define id of the perticular record for fatching data*/
  getByCustomer(id: number): Observable<Customers> {

    const url = `${this.customerURL}/${id}`;
    return this.http.get<Customers>(url);
  }
  /** this method update the data whichever we want to update for perticular id */
  updateCustomer(customer: Customers): Observable<Customers> {
    const url = `${this.customerURL}/${customer.id}`;
    console.log(customer.id);
    return this.http.put<Customers>(url, customer);
  }
  /**for searching data from table
   * @param data which define search whatever you want
   */
  searchData(data: any): Observable<any> {
       const url = `${this.customerURL}?q=${data}`;
      return this.http.get<any>(url);
  }
  /**
   * @param page which define starting page
   * @param pageSize which define size of the page
   */
  pagination(page: number , pageSize: number, data: any): Observable<any> {
    const start = (page * pageSize) - pageSize;
    const end = (page * pageSize);
    let url = `${this.customerURL}?_start=${start}&_end=${end}`;

    if (data && data !== '') {
      url = url.concat(`&q=${data}`);
    }
    return this.http.get<any>(url);
  }
  /**@param key which define the value of key which we have to sort
   * @param orders which define how to sort element by which order
   */
  orderByData(keys: any , orders: string): Observable<Customers[]> {
    const order = 'desc';
    const url = `${this.customerURL}?_sort=${keys}&_order=${order}`;
   return this.http.get<Customers[]>(url);

  //  .map(res => {
  //    const ret = <Customers[]>res.json();
  //    ret.sort((a, b) => a.name < b.name ? -1 : 1);
  //    return ret;
  //  });
  //  return returnVar;
  }


}
