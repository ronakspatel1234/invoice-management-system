/**
 * @author Akshita Kapadia
 * services for server interaction using httpClient 
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from './products.model';
import { environment } from '../../environments/environment';




@Injectable()
export class ProductsService {
  /**
   * url to store product database
   * searchUrl for search api call
   * orderUrl for order api call
   */
  private productUrl = environment.baseUrl+'/product';
  private searchUrl;
  private orderUrl;

  /**
   * 
   * @param http inject httpClient to interact with server
   */
  constructor(private http: HttpClient) { }

  /**
   * to get all product's data from server 
   */
  getProduct(): Observable<Product[]> {
 
    return this.http.get<Product[]>(this.productUrl);
  }

  /**
   * 
   * @param id for specific id's product data
   * 
   * @description to get products of specific id from server 
   * 
   */
  getById(id:number):Observable<Product>
  {
    return this.http.get<Product>(this.productUrl+"/"+id);
  }
  /**
   * 
   * add products to server using observable
   */
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product);
  }
  /**
   * 
   * @param id get product data of perticular id from server
   * and give it to form 
   */
  public editProduct(id: number): Observable<Product> {
  
    const url = this.productUrl + '/' + id;
    return this.http.get<Product>(url);
  }
  /**
   * 
   * @param product stores product data on server
   * @description add the data on form and update it using this method on server
   */
  public updateProduct(product): Observable<Product> {
    return this.http.put<Product>(this.productUrl+"/"+product.id, product);
  }

  /**
   * 
   *to search and get specific  data from server 
   */
  public searchData(search:any):Observable<Product[]>
  {
    this.searchUrl='?q=';
    const urls=this.productUrl+this.searchUrl+search
    return this.http.get<Product[]>(urls)
  }

  /**
   * 
   * @param page set the starting page number
   * @param pagesize set the size of the page
   * @param data for search
   * @description this method to interact with json-server for pagination
   */
  public getPagination(page:number,pagesize:number,data:any):Observable<Product[]>
  {
    const start = (page * pagesize) - pagesize;
    const end = (page * pagesize);
  
    let pageUrl = this.productUrl  + '?_start=' + start + '&_end=' + end;
    if(data && data!=='')
    {
      pageUrl=pageUrl.concat('&q='+data)
    }
    return this.http.get<Product[]>(pageUrl)
  }

  /**
   * 
   * @param id delete product of specific id from server
   */
  public deleteProduct(id:number):Observable<Product>
  {
    return this.http.delete<Product>(this.productUrl+"/"+id)
  }

  /**
   * 
   * @param order to define order
   * @description this method to interact with json server for sorting
   */
  // public orderByProduct(page:number,pagesize:number,orderBy:string): Observable<Products[]> {
  //   let start;
  //  let end;
  //   const  urls= this.productUrl+'?_start=' + start + '&_end=' + end+this.orderUrl;
  //   return this.http.get<Products[]>(urls)
  // }
  

}
