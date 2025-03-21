import { Component, inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule,CommonModule,FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  salesData: any;
  chartOptions: any = {};
  selectedChartTypeSalesAnalytics: string = 'line';
  selectedChartTypeOrdersGeography: string = 'donut';
  selectedChartTypeTopCategories: string = 'bar';

  service = inject(DashboardService);
  
  ngOnInit() {
    this.service.getMetrics().subscribe((data: any) => {
      this.salesData = data.salesData;
      this.updateCharts();
    });
  }

  onChartTypeChange(event: any, chartTypeKey: string) {
    switch (chartTypeKey) {
      case 'salesAnalytics':
        this.selectedChartTypeSalesAnalytics = event.target.value;
        this.createSalesAnalyticsChart();
        break;
      case 'ordersGeography':
        this.selectedChartTypeOrdersGeography = event.target.value;
        this.createOrdersGeographyChart();
        break;
      case 'topCategories':
        this.selectedChartTypeTopCategories = event.target.value;
        this.createTopCategoriesChart();
        break;
    }
  }

  private updateCharts() {
    this.createSalesAnalyticsChart();
    this.createOrdersGeographyChart();
    this.createTopCategoriesChart();
  }

  private createSalesAnalyticsChart() {
    if (!this.salesData?.salesAnalytics) {
      console.error('Sales analytics data is not available.');
      return;
    }

    this.chartOptions.salesAnalytics = {
      series: [
        { name: 'Income', data: this.salesData.salesAnalytics.income },
        { name: 'Profit', data: this.salesData.salesAnalytics.profit }
      ],
      chart: {
        type: this.selectedChartTypeSalesAnalytics,
      },
      xaxis: {
        categories: this.salesData.salesAnalytics.labels
      },
      colors: ['#008FFB', '#00E396']
    };
  }

  private createOrdersGeographyChart() {
    if (!this.salesData?.ordersGeography) {
      console.error('Orders geography data is not available.');
      return;
    }

    this.chartOptions.ordersGeography = {
      series: Object.values(this.salesData.ordersGeography),
      labels: Object.keys(this.salesData.ordersGeography),
      chart: {
        type: this.selectedChartTypeOrdersGeography === 'pie' ? 'donut' : this.selectedChartTypeOrdersGeography
      },
      colors: ['#775DD0', '#FF4560', '#FEB019', '#00E396']
    };
  }

  private createTopCategoriesChart() {
    if (!this.salesData?.topCategories) {
      console.error('Top categories data is not available.');
      return;
    }

    this.chartOptions.topCategories = {
      series: [
        {
          name: 'All Time',
          data: Object.values(this.salesData.topCategories.allTime)
        },
        {
          name: 'Weekly',
          data: Object.values(this.salesData.topCategories.weekly)
        },
        {
          name: 'Monthly',
          data: Object.values(this.salesData.topCategories.monthly)
        }
      ],
      chart: {
        type: this.selectedChartTypeTopCategories,
      },
      xaxis: {
        categories: Object.keys(this.salesData.topCategories.allTime)
      },
      colors: ['#008FFB', '#00E396', '#FEB019']
    };
  }
}
