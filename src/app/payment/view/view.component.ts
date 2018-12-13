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

  loading = false;
  total = 0;
  page = 1;
  limit = 20;

  constructor(private service: PaymentService) {
    this.payments = [];
  }

  ngOnInit() {
    this.getPayments();
  }

  getPayments(): void {
    this.loading = true;
    this.service.getPayments().subscribe(res => {
      console.log(res);
      this.total = res.total;
      this.payments = res.payments;
      console.log(this.payments);
      this.loading = false;
    })
  }

  goToPage(n: number): void {
    this.page = n;
    this.getPayments();
  }

  onNext(): void {
    this.page++;
    this.getPayments();
  }

  onPrev(): void {
    this.page--;
    this.getPayments();
  }

}
