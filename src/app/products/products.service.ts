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
  private queryUrl;
  private orderUrl;
  constructor(private http: HttpClient) { }

  getProduct(): Observable<Products[]> {
    // if(data && data!=='')
    // {
    //   this.url=this.url.concat(`&q=${data}`)
    // }
    return this.http.get<Products[]>(this.url);
  }

  getById(id:number):Observable<Products>
  {
    return this.http.get<Products>(this.url+"/"+id);
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
  
    const url = this.url + '/' + id;
    return this.http.get<Products>(url);
  }
  /**
   * 
   * @param product stores product data on server
   * @description add the data on form and update it using this method on server
   */
  public updateProduct(product): Observable<Products> {
    return this.http.put<Products>(this.url+"/"+product.id, product);
  }

  public searchData(search:any):Observable<Products[]>
  {
    this.queryUrl='?q=';
    const urls=this.url+this.queryUrl+search
    return this.http.get<Products[]>(urls)
  }

  public getPagination(page:number,pagesize:number,data:any):Observable<Products[]>
  {
    const start = (page * pagesize) - pagesize;
    const end = (page * pagesize);
  
    let pageUrl = this.url  + '?_start=' + start + '&_end=' + end;
    if(data && data!=='')
    {
      pageUrl=pageUrl.concat('&q='+data)
    }
    return this.http.get<Products[]>(pageUrl)
  }

  public deleteProduct(id:number):Observable<Products>
  {
    return this.http.delete<Products>(this.url+"/"+id)
  }

  public orderByProduct(orderBy: any): Observable<Products[]> {
   const order='desc'
    this.orderUrl='?_sort'
   
    const  urls= this.url+this.orderUrl+orderBy+order
    return this.http.get<Products[]>(urls)
  }
  
//   getImage(id: string): Observable<Blob> {
//     return this.http.get('http://assets/product-images/'+id, {responseType: "blob"});
// }
}
