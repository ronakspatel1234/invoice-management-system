/**
 * @author - Ronak Patel.
 * @description - Create for card status.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Card } from './card/card.model';


@Component({
  selector: 'ims-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit, OnChanges {

  @Input() public customers;

  @Input() public dashboard;


  public customer: Card = new Card();
  public amountRecivable: Card = new Card();
  public totalRevenue: Card = new Card();
  public unpaidInvoice: Card = new Card();

  constructor() {
  }

  ngOnInit() {


  }
  ngOnChanges() {

    this.customer.title = 'Customers';
    this.customer.data = this.customers;
    this.amountRecivable.title = 'Amount Recivable';
    this.amountRecivable.data = this.dashboard.totalUnpaidInvoices;
    this.totalRevenue.title = 'Total Revenue';
    this.totalRevenue.data = this.dashboard.totalPaidInvoices;
    this.unpaidInvoice.title = 'Unpaid Invoice';
    this.unpaidInvoice.data = this.dashboard.UnpaidQuotationsId;
  }

}
