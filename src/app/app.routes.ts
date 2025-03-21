import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesComponent } from './components/dashboard/sales/sales.component';
import { PerformanaceComponent } from './components/dashboard/performanace/performanace.component';
import { UserEngagementComponent } from './components/dashboard/user-engagement/user-engagement.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        children:[
            {
                path:'',
                component:SalesComponent
            },
            {
                path:'performance',
                component:PerformanaceComponent
            },
            {
                path:'user-engagement',
                component:UserEngagementComponent
            },
            {
                path:'sales',
                component:SalesComponent
            }
        ]
    }
];
