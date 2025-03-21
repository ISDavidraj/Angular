import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { 
    this.getMetrics();
  }

  getMetrics() {
    return this.http.get(`assets/data/metrics.json`);
  }
}
