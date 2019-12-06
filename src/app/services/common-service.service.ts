import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient) { }

  postExcelDataService(excelData:Array<object>){
    return this.http.post(environment.endpoint.excelPostDataUrl,excelData)
  }
}
