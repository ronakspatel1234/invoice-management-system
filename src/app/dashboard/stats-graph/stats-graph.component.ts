/**
 * @author - Ronak Patel.
 * @description -
 */
import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'ims-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent implements OnInit {
  @Input() public invoiceChart;
  public paymentChart;
  public customerChart;
  public customerData: any;
  public paymentData: any;
  public invoiceData: any;
  public invoiceMerge: any = [];
  public isBoolean: boolean;
  constructor(private service: DashboardService) {
    this.customerData = [];
    this.paymentData = [];
    this.isBoolean = false;
  }
  ngOnInit() {
    this.mothWiseData();
    this.getpayment();
  }

  public mothWiseData(): void {
    const months = ['-Jan-', '-Feb-', '-Mar-', '-Apr-', '-May-', '-Jun-', '-Jul-', '-Aug-', '-Sep-', '-Oct-', '-Nov-', '-Dec-'];
    months.forEach(month => {
      this.service.getCustomerByMonth(month).subscribe(customer => {
        this.customerData.push({ 'name': month, 'value': customer.length, 'customer': customer });
        this.service.getPaymentByMonth(month).subscribe(payment => {
          this.paymentData.push({ 'name': month, 'value': payment });
        });
      });
    });
  }

  public getpayment(): void {
    const status = 'Paid';
    this.service.getInvoiceByStatus(status).subscribe(invoices => {
      invoices.forEach(invoice => {
        this.service.getQuotationsByID(invoice.quotation_id).subscribe((quotation: any) => {
          this.invoiceMerge.push({ invoice: invoice.id, quotation: quotation.grand_total });
        });
      });

    });
  }

  public change() {
    this.isBoolean = !this.isBoolean;
    const payment = this.paymentData;
    const quotations = this.invoiceMerge;
    this.paymentChart = [];
    this.customerChart = [{
      'name': 'Customer Visit', 'series': this.customerData
    }
    ];
    payment.forEach(element => {
      let value = 0;
      element.value.forEach(invoice => {
        for (let index = 0; index < quotations.length; index++) {
          if (invoice.invoice_id === quotations[index].invoice) {
            value = value + quotations[index].quotation;
            break;
          }
        }
      });
      this.paymentChart.push({ 'name': element.name, 'value': value });
    });

  }
}
