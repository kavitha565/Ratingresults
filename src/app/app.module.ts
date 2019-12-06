import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelComponent } from './components/excel/excel.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuotesTableComponent } from './components/quotes-table/quotes-table.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { QuotesHeadingPipe } from './quotes-heading.pipe';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthModule } from '@okta/okta-angular';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcelComponent,
    DashboardComponent,
    QuotesTableComponent,
    ResultsTableComponent,
    AutocompleteComponent,
    QuotesHeadingPipe,
    LoginComponent,
    HeaderComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
