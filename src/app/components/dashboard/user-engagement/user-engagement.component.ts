import { Component, inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-engagement',
  imports: [NgApexchartsModule,FormsModule],
  templateUrl: './user-engagement.component.html',
  styleUrl: './user-engagement.component.scss'
})
export class UserEngagementComponent {
  metrics: any;
  selectedChartTypeCES: string = 'pie';
  selectedChartTypeNPS: string = 'donut';
  selectedChartTypeCSAT: string = 'donut';
  selectedChartTypeServiceLevel: string = 'bar';
  selectedChartTypeProductQuality: string = 'area';
  selectedChartTypePriceSatisfaction: string = 'line';
  chartOptions: any = {};
  service = inject(DashboardService);

  ngOnInit() {
    this.service.getMetrics().subscribe((data: any) => {
      this.metrics = data.userEngagementMetrics;
      this.updateCharts();
    });
  }

  onChartTypeChange(event: any, chartTypeKey: string) {
    switch (chartTypeKey) {
      case 'ces':
        this.selectedChartTypeCES = event.target.value;
        this.createCESChart();
        break;
      case 'nps':
        this.selectedChartTypeNPS = event.target.value;
        this.createNPSChart();
        break;
      case 'csat':
        this.selectedChartTypeCSAT = event.target.value;
        this.createCSATChart();
        break;
      case 'serviceLevel':
        this.selectedChartTypeServiceLevel = event.target.value;
        this.createServiceLevelChart();
        break;
      case 'productQuality':
        this.selectedChartTypeProductQuality = event.target.value;
        this.createProductQualityChart();
        break;
      case 'priceSatisfaction':
        this.selectedChartTypePriceSatisfaction = event.target.value;
        this.createPriceSatisfactionChart();
        break;
    }
  }

  private updateCharts() {
    this.createCESChart();
    this.createNPSChart();
    this.createCSATChart();
    this.createServiceLevelChart();
    this.createProductQualityChart();
    this.createPriceSatisfactionChart();
  }

  private createCESChart() {
    if (this.selectedChartTypeCES === 'pie' || this.selectedChartTypeCES === 'donut') {
      const cesScaleMax = 5;
      const cesScore = this.metrics.customerEffortScore;
      const cesProportion = (cesScore / cesScaleMax) * 100;
      const remainingProportion = 100 - cesProportion;
      this.chartOptions.ces = {
        series: [cesProportion, remainingProportion],
        chart: {
          type: this.selectedChartTypeCES,
          height: 180
        },
        labels: ['Customer Effort Score', 'Remaining'],
        colors: ['#008FFB', '#c5dde8']
      };
    }
  }

  private createNPSChart() {
    if (this.selectedChartTypeNPS === 'pie' || this.selectedChartTypeNPS === 'donut') {
      this.chartOptions.nps = {
        series: [
          this.metrics.netPromoterScore.promoters,
          this.metrics.netPromoterScore.passives,
          this.metrics.netPromoterScore.detractors
        ],
        chart: {
          type: this.selectedChartTypeNPS,
          height: 180
        },
        labels: ['Promoters', 'Passives', 'Detractors'],
        colors: ['#00E396', '#FEB019', '#FF4560']
      };
    }
  }

  private createCSATChart() {
    if (this.selectedChartTypeCSAT === 'pie' || this.selectedChartTypeCSAT === 'donut') {
      const csatScore = this.metrics.csatScore;
      const remainingProportion = 100 - csatScore;
      this.chartOptions.csat = {
        series: [csatScore, remainingProportion],
        chart: {
          type: this.selectedChartTypeCSAT,
          height: 180
        },
        labels: ['CSAT Score', 'Remaining'],
        colors: ['#775DD0', '#e1d3ed']
      };
    }
  }

  private createServiceLevelChart() {
    this.chartOptions.serviceLevel = {
      series: [{
        data: Object.values(this.metrics.customerSatisfaction.serviceLevel)
      }],
      chart: {
        type: this.selectedChartTypeServiceLevel,
        height: 300
      },
      xaxis: {
        categories: Object.keys(this.metrics.customerSatisfaction.serviceLevel)
      },
      colors: ['#008FFB']
    };
  }

  private createProductQualityChart() {
    this.chartOptions.productQuality = {
      series: [{
        data: Object.values(this.metrics.customerSatisfaction.productQuality)
      }],
      chart: {
        type: this.selectedChartTypeProductQuality,
        height: 300
      },
      xaxis: {
        categories: Object.keys(this.metrics.customerSatisfaction.productQuality)
      },
      colors: ['#00E396']
    };
  }

  private createPriceSatisfactionChart() {
    this.chartOptions.priceSatisfaction = {
      series: [{
        data: Object.values(this.metrics.customerSatisfaction.priceSatisfaction)
      }],
      chart: {
        type: this.selectedChartTypePriceSatisfaction,
        height: 300
      },
      xaxis: {
        categories: Object.keys(this.metrics.customerSatisfaction.priceSatisfaction)
      },
      colors: ['#FEB019']
    };
  }
}