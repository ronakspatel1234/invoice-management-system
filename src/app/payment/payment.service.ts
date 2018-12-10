/**
 * @author - Shahbaz Shaikh
 * @description - This service file are communication between component to server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Payment } from './payment.model';
// --------------------------------- //

@Injectable()
export class PaymentService {

  // Declare the URL for server
  private dbUrl: string;
  constructor(private http: HttpClient) {
    // Define the URL for server
    this.dbUrl = 'http://localhost:3000/payment';
  }

  public getPayments(): Observable<Payment[]> {

    return this.http.get<Payment[]>(this.dbUrl);
  }
}
