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
            'name': '2016-09-17T09:26:32.287Z'
          },
          {
            'value': 3605,
            'name': '2016-09-16T03:22:13.876Z'
          },
          {
            'value': 5526,
            'name': '2016-09-22T08:24:54.866Z'
          },
          {
            'value': 4653,
            'name': '2016-09-12T20:32:46.678Z'
          },
          {
            'value': 3126,
            'name': '2016-09-24T04:25:21.776Z'
          }
        ]
      },
      {
        'name': 'Malaysia',
        'series': [
          {
            'value': 4124,
            'name': '2016-09-17T09:26:32.287Z'
          },
          {
            'value': 6748,
            'name': '2016-09-16T03:22:13.876Z'
          },
          {
            'value': 6213,
            'name': '2016-09-22T08:24:54.866Z'
          },
          {
            'value': 6417,
            'name': '2016-09-12T20:32:46.678Z'
          },
          {
            'value': 4413,
            'name': '2016-09-24T04:25:21.776Z'
          }
        ]
      },
      {
        'name': 'Falkland Islands (Malvinas)',
        'series': [
          {
            'value': 6478,
            'name': '2016-09-17T09:26:32.287Z'
          },
          {
            'value': 5583,
            'name': '2016-09-16T03:22:13.876Z'
          },
          {
            'value': 2017,
            'name': '2016-09-22T08:24:54.866Z'
          },
          {
            'value': 3801,
            'name': '2016-09-12T20:32:46.678Z'
          },
          {
            'value': 3141,
            'name': '2016-09-24T04:25:21.776Z'
          }
        ]
      },
      {
        'name': 'Mayotte',
        'series': [
          {
            'value': 5232,
            'name': '2016-09-17T09:26:32.287Z'
          },
          {
            'value': 5135,
            'name': '2016-09-16T03:22:13.876Z'
          },
          {
            'value': 6297,
            'name': '2016-09-22T08:24:54.866Z'
          },
          {
            'value': 3733,
            'name': '2016-09-12T20:32:46.678Z'
          },
          {
            'value': 5644,
            'name': '2016-09-24T04:25:21.776Z'
          }
        ]
      },
      {
        'name': 'Philippines',
        'series': [
          {
            'value': 5766,
            'name': '2016-09-17T09:26:32.287Z'
          },
          {
            'value': 2036,
            'name': '2016-09-16T03:22:13.876Z'
          },
          {
            'value': 4424,
            'name': '2016-09-22T08:24:54.866Z'
          },
          {
            'value': 5747,
            'name': '2016-09-12T20:32:46.678Z'
          },
          {
            'value': 3337,
            'name': '2016-09-24T04:25:21.776Z'
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

}
