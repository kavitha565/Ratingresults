import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,MatPaginator } from '@angular/material';


@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  resultsCount:number = 5
  quotesData : Array<object> = []

  constructor() { }
  
  displayedColumns: string[] = ["ranking", "insurer",	"unitRate", "premium", "percentageChangeInExpiringUnitRate", "freeCoverLevel", "singleEventMaxium"];

  //,	"Reason for Decline",	"SP Costed",	"Unit Rate",	"Premium",	"Percentage Change in Expiring Unit Rate",	"Free Cover Level",	"Single Event Maximum", "Other Notes",	"Time of Export",	"Expiring Unit Rate",	"Client",	"Scheme Name",	"Product",	"Review Membership",	"Existing Basis",	"Basis Number",	"Basis Description",	"Round"
  
  dataSource 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  onSelect(){
    //alert(this.resultsCount)
    let selectedQuotes = this.quotesData.slice(0,this.resultsCount)
    this.dataSource = new MatTableDataSource(selectedQuotes);
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    if(localStorage.insurerData)
    this.quotesData = JSON.parse(localStorage.insurerData)
    //sort Data based on Unit rate
   // this.quotesData = this.quotesData.sort((a:any,b:any) => (a.unitRate < b.unitRate) ? 1 : ((b.unitRate < a.unitRate) ? -1 : 0)); 
    for(var i=0;i<this.quotesData.length;i++){
      for(var j=i+1;j<this.quotesData.length;j++){
        if(this.quotesData[i]["unitRate"]<this.quotesData[j]["unitRate"]){
          var temp= this.quotesData[i];
          this.quotesData[i]=this.quotesData[j];
          this.quotesData[j]=temp;
        }
      }
    }
    //add Ranking column 
    let resultRanking = 1
    for(let i=0;i<this.quotesData.length;i++){
      this.quotesData[i]["ranking"] = resultRanking++
    }
    
    this.onSelect()
    
    //this.dataSource = new MatTableDataSource(this.quotesData);
    //this.dataSource.paginator = this.paginator;
  }

}
