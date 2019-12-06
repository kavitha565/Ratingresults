import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelComponent } from './components/excel/excel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuotesTableComponent } from './components/quotes-table/quotes-table.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { TableComponent } from './components/table/table.component';


const routes: Routes = [
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path : 'table',
    component : TableComponent
  },
  {
    path : 'autocomplete',
    component : AutocompleteComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    //canActivate : [AuthGuardService]
  },
  {
    path : 'quotes',
    component : QuotesTableComponent
  },
  {
    path : 'results',
    component : ResultsTableComponent
  },
  {
    path : 'excel',
    component : ExcelComponent
  },
  {
    path : '**',
    redirectTo : 'dashboard',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
