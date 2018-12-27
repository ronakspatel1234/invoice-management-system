import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Products } from './products.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductsService {
  /**
   * url to store product database
   */
  private url = environment.baseUrl+'/product';

  constructor(private http: HttpClient) { }
  getProduct(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url);
  }
  /**
   * 
   * add products to server using observable
   */
  public addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.url, product);
  }
  /**
   * 
   * @param id get product data of perticular id from server
   * and give it to form 
   */
  public editProduct(id: number): Observable<Products> {
    return this.http.put<Products>(this.url, id);
  }
  /**
   * 
   * @param product stores product data on server
   * @description add the data on form and update it using this method on server
   */
  public updateProduct(product): Observable<Products> {
    return this.http.put<Products>(this.url, product);
  }

  public searchData():Observable<Products[]>
  {
    return this.http.get<Products[]>(this.url)
  }


}
