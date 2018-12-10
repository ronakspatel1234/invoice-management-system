/**
 * @author - Shahbaz Shaikh
 * @description - This component file are display the payment data.
 */
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';
// -------------------------------------- //

@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  payments: any[];

  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  data: any;

  constructor(private service: PaymentService) {
    this.payments = [];
  }

  ngOnInit() {
    this.getPayments();
  }

  getPayments() {
    this.service.getPayments().subscribe(
      (data) => {
        console.log(data);
        this.payments= data;
      });
  }

}
