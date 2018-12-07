import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { CardComponent } from './stats-card/card/card.component';
import { StatsGraphComponent } from './stats-graph/stats-graph.component';
import { StatsTableComponent } from './stats-table/stats-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [StatsCardComponent,
     CardComponent,
      StatsGraphComponent,
       StatsTableComponent,
        DashboardComponent]
})
export class DashboardModule { }
