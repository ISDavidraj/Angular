import { Component, inject } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardService } from '../dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-performanace',
  imports: [NgApexchartsModule,CommonModule,FormsModule],
  templateUrl: './performanace.component.html',
  styleUrl: './performanace.component.scss'
})
export class PerformanaceComponent {
  metrics: any;
  selectedTimeframe: string = 'weekly';
  chartOptions: any = {};
  selectedChartTypeKeyMetrics: string = 'bar';
  selectedChartTypeEbitda: string = 'line';
  selectedChartTypeCustomerSatisfaction: string = 'area';
  selectedChartTypeFinancialMetrics: string = 'bar';

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getMetrics().subscribe((data: any) => {
      this.metrics = data.performanceMetrics;
      this.updateCharts();
    });
  }

  onTimeframeChange(event: any) {
    this.selectedTimeframe = event.target.value;
    this.updateCharts();
  }

  onChartTypeChange(event: any, chartTypeKey: string) {
    switch (chartTypeKey) {
      case 'keyMetrics':
        this.selectedChartTypeKeyMetrics = event.target.value;
        this.createKeyMetricsChart(this.metrics[this.selectedTimeframe]);
        break;
      case 'ebitda':
        this.selectedChartTypeEbitda = event.target.value;
        this.createEbitdaChart(this.metrics[this.selectedTimeframe]);
        break;
      case 'customerSatisfaction':
        this.selectedChartTypeCustomerSatisfaction = event.target.value;
        this.createCustomerSatisfactionChart(this.metrics[this.selectedTimeframe]);
        break;
      case 'financialMetrics':
        this.selectedChartTypeFinancialMetrics = event.target.value;
        this.createFinancialMetricsChart();
        break;
    }
  }

  private updateCharts() {
    const data = this.metrics[this.selectedTimeframe];
    this.createKeyMetricsChart(data);
    this.createEbitdaChart(data);
    this.createCustomerSatisfactionChart(data);
    this.createFinancialMetricsChart();
  }

  private createKeyMetricsChart(data: any) {
    if (!data) {
      console.error('Key metrics data is not available.');
      return;
    }

    const categories = ['Revenue', 'Profit Margin', 'ROI', 'CLV'];
    const seriesData = categories.map((category) => {
      switch (category) {
        case 'Revenue':
          return data.revenue;
        case 'Profit Margin':
          return data.profitMargin;
        case 'ROI':
          return data.roi;
        case 'CLV':
          return data.clv;
        default:
          return 0;
      }
    });

    if (this.selectedChartTypeKeyMetrics === 'radar') {
      this.chartOptions.keyMetrics = {
        series: [
          {
            name: 'Metrics',
            data: seriesData
          }
        ],
        chart: {
          type: 'radar',
          height: 240
        },
        xaxis: {
          categories: categories
        },
        colors: ['#008FFB']
      };
    } else {
      this.chartOptions.keyMetrics = {
        series: [
          {
            name: 'Metrics',
            data: seriesData
          }
        ],
        chart: {
          type: this.selectedChartTypeKeyMetrics,
          height: 240
        },
        xaxis: {
          categories: categories
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560']
      };
    }
  }

  private createEbitdaChart(data: any) {
    if (!data?.ebitda) {
      console.error('EBITDA data is not available.');
      return;
    }

    this.chartOptions.ebitda = {
      series: [
        { name: 'EBITDA', data: data.ebitda }
      ],
      chart: {
        type: this.selectedChartTypeEbitda,
        height: 240
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      colors: ['#775DD0']
    };
  }

  private createCustomerSatisfactionChart(data: any) {
    if (!data?.customerSatisfaction) {
      console.error('Customer satisfaction data is not available.');
      return;
    }

    this.chartOptions.customerSatisfaction = {
      series: [
        { name: 'Customer Satisfaction', data: data.customerSatisfaction }
      ],
      chart: {
        type: this.selectedChartTypeCustomerSatisfaction,
        height: 240
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      colors: ['#00E396']
    };
  }

  private createFinancialMetricsChart() {
    if (!this.metrics?.financialMetrics) {
      console.error('Financial metrics data is not available.');
      return;
    }

    this.chartOptions.financialMetrics = {
      series: [
        { name: 'Net Profit Margin', data: this.metrics.financialMetrics.netProfitMargin },
        { name: 'Debt to Equity Ratio', data: this.metrics.financialMetrics.debtToEquityRatio }
      ],
      chart: {
        type: this.selectedChartTypeFinancialMetrics,
        height: 240
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      colors: ['#008FFB', '#FF4560']
    };
  }
}