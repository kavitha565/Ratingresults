import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showResults : boolean  = true
  constructor(){}
  onPaste(event:ClipboardEvent){
    let clipboardData = event.clipboardData
    let parsedText = clipboardData.getData('text')
    console.log(parsedText)
    //this.generateTableData(parsedText)
  }
  ngOnInit(){

  }
}
