import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  template:`
  <router-outlet></router-outlet>
  `,
  styles:``
})
export class DashboardComponent {
 
}
