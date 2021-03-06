import {Component, OnInit, Input, Inject} from '@angular/core';
import {D3, D3ChartService} from "../../charts/nvD3/nvD3.service";
import {recentCustomersDemoValues} from "../../../creative/data/widgetDemoData.data";
import * as moment from 'moment';

@Component({
  selector: 'ms-recent-sales',
  templateUrl: './recent-sales.component.html',
  styleUrls: ['./recent-sales.component.scss']
})
export class RecentSalesComponent implements OnInit {

  @Input('sales') sales: any[];
  @Input('chartData') chartData: any[];
  @Input('chartOptions') chartOptions: any;

  d3: D3;

  constructor(
    @Inject(D3ChartService) d3ChartService: D3ChartService
  ) {
    this.d3 = d3ChartService.getD3();
  }

  ngOnInit() {
    let d3 = this.d3;

    let min = 0;
    let max = d3.max(recentCustomersDemoValues);

    this.chartOptions = {
      chart: {
        type: 'lineChart',
        height: 100,
        margin : {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        x: (d) => { return d.date; },
        y: (d) => { return d.value; },
        showXAxis: false,
        showYAxis: false,
        xAxis: {
          ticks: d3.time.days,
          axisLabel: '',
          tickFormat: (d) => {
            //return d3.time.format('%H:00')(new Date(d));
            return moment(new Date(d)).calendar();
          }
        },
        yDomain: [min, max],
        showLegend: false,
        useInteractiveGuideline: true,
        color: ['#DBF6F9']
      },
    };
  }

}
