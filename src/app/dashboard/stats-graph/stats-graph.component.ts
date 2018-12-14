/**
 * @author - Ronak Patel.
 * @description -
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Key } from 'protractor';

@Component({
  selector: 'ims-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent implements OnInit, OnChanges {
  @Input() public invoiceChart;
  @Input() public paymentChart;
  @Input() public customerChart;
  constructor(private service: DashboardService) {
    this.paymentChart = [
      {
        "name": "jan",
        "value": 40
      },
      {
        "name": "fab ",
        "value": 49
      },
      {
        "name": "France",
        "value": 36
      },
      {
        "name": "United Kingdom",
        "value": 36
      },
      {
        "name": "Spain",
        "value": 33
      },
      {
        "name": "Italy",
        "value": 35
      },
      {
        "name": "Italy",
        "value": 35
      },
      {
        "name": "lakhan",
        "value": 35
      },
      {
        "name": "mayank",
        "value": 35
      },
      {
        "name": "ronak",
        "value": 35
      }
    ];
    this.customerChart = [
      {
        "name": "Timor-Leste",
        "series": [
          {
            "value": 6623,
            "name": "2016-09-18T11:40:07.381Z"
          },
          {
            "value": 5127,
            "name": "2016-09-15T00:31:08.848Z"
          },
          {
            "value": 4676,
            "name": "2016-09-19T09:58:54.433Z"
          },
          {
            "value": 3679,
            "name": "2016-09-14T20:53:04.102Z"
          },
          {
            "value": 3698,
            "name": "2016-09-13T21:04:26.447Z"
          }
        ]
      }
    ];
  }
  public data = []
  ngOnInit() {
    this.mothWiseData();
  }
  mothWiseData(): void {
    const month = ['-Jan-', '-Feb-', '-Mar-', '-Apr-', '-May-', '-Jun-', '-Jul-', '-Aug-', '-Sep-', '-Oct-', '-Nov-', '-Dec-'];

    month.forEach(element => {
      this.service.getCustomerByMonth(element).subscribe(data => {
        this.data.push({ 'name': element, 'value': data.length });
        
      });

    })




  }
  ngOnChanges() {
    // console.log(this.paymentChart);
    // this.paymentChart = this.data;

    console.log(this.data);


  }
  change() {
    this.paymentChart = this.data;
    this.customerChart = [{
      'name': 'Mozambique', 'series': this.data
    }
    ];
  }
}
