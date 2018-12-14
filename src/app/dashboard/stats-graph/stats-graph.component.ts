/**
 * @author - Ronak Patel.
 * @description -
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ims-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent implements OnInit {
  @Input() public invoiceChart;
  @Input() public paymentChart;
  @Input() public customerChart;
  constructor() {
    this.paymentChart = [
      {
        'name': 'Germany',
        'value': 40632
      },
      {
        'name': 'United States',
        'value': 49737
      },
      {
        'name': 'France',
        'value': 36745
      },
      {
        'name': 'United Kingdom',
        'value': 36240
      },
      {
        'name': 'Spain',
        'value': 33000
      },
      {
        'name': 'Italy',
        'value': 35800
      }
    ];
    this.customerChart = [
      {
        'name': 'Mozambique',
        'series': [
          {
            'value': 5797,
            'name': '2016-09-17'
          },
          {
            'value': 3605,
            'name': '2016-09-16'
          },
          {
            'value': 5526,
            'name': '2016-09-22'
          },
          {
            'value': 4653,
            'name': '2016-09-1'
          },
          {
            'value': 3126,
            'name': '2016-09-24'
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
