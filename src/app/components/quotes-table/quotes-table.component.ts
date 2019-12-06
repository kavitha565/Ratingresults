import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-quotes-table',
  templateUrl: './quotes-table.component.html',
  styleUrls: ['./quotes-table.component.scss']
})
export class QuotesTableComponent implements OnInit {

  insurersList :Array<string>
  quotesData : Array<object> = []
  filteredOptions;
  dataSource 
  data
  selection
  submitted:boolean = false
  autocompleteErrorObj:any = {}
  constructor() { }
  
  displayedColumns: string[] = ["select", "insurer",	"quoteRequested",	"quoteDeclined", "reasonForDecline",	"spCosted",	"unitRate","premium","percentage","freeCoverLevel","singleEventMaximum","otherNotes"];
  //displayedColumns: string[] = ["insurer",	"quoteRequested",	"quoteDeclined", "reasonForDecline",	"spCosted",	"unitRate","premium","percentageChangeInExpiringUnitRate","freeCoverLevel","singleEventMaxium","otherNotes","timeofExport","expiringUnitRate","client","schemeName","product","reviewMembership","existingBasis","basisNumber","basisDescription","round"];
  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  checkAutoCompleteValidation(){
    if(this.autocompleteErrorObj && Object.keys(this.autocompleteErrorObj).length>0){
      let validationArr = Object.values(this.autocompleteErrorObj)
      return validationArr.includes(true)
    }else{
      return false
    }
  }

  checkFormLevelValidation(formName,value){
    switch(formName) {
        case 'insurer':
          if(!this.insurersList.includes(value))
          return true
          break;
        case 'unitRate':
        case 'premium': 
        case 'percentage':
        case 'freeCoverLevel':
        case 'singleEventMaximum' : 
          let pattern = new RegExp("^[0-9]*\.?[0-9][0-9]*$")
          if(!pattern.test(value))
          return true
        default:
          // code block
      }
  }

  checkValidation(){
    console.log(this.quotesData)
    for(let i=0;i<this.quotesData.length;i++){
      if(this.quotesData[i]["insurer"]!='' && this.checkFormLevelValidation('insurer',this.quotesData[i]["insurer"]))
      return true
      if(this.quotesData[i]["unitRate"]!='' && this.checkFormLevelValidation('unitRate',this.quotesData[i]["unitRate"]))
      return true
      if(this.quotesData[i]["premium"]!='' && this.checkFormLevelValidation('premium',this.quotesData[i]["premium"]))
      return true
      if(this.quotesData[i]["percentage"]!='' && this.checkFormLevelValidation('percentage',this.quotesData[i]["percentage"])){
        
        return true
      }
      if(this.quotesData[i]["freeCoverLevel"]!='' && this.checkFormLevelValidation('freeCoverLevel',this.quotesData[i]["freeCoverLevel"]))
      return true
      if(this.quotesData[i]["singleEventMaximum"]!='' && this.checkFormLevelValidation('singleEventMaximum',this.quotesData[i]["singleEventMaximum"]))
      return true
    }
    return false
  }

  submitData(quotesForm){
    
    //check form is modified or not
    // if(!quotesForm.dirty){
    //   alert("No changes are detected!!")
    //   return;
    // }
    
    //check validation
    //if(quotesForm.invalid || this.checkAutoCompleteValidation())
    //alert("Please clear errors!!")

    if(this.checkValidation())
    alert("Please clear errors!!")
    else{
      let count = 0
      let data = []
      //page level submit
      //let skip = this.paginator.pageSize * this.paginator.pageIndex;
      //let pagedData = this.quotesData.filter((u, i) => i >= skip).filter((u, i) => i <this.paginator.pageSize);

      //check whether row is empty or not
      let tableColumns
      if(this.displayedColumns.length>0){
        tableColumns = [...this.displayedColumns]
        tableColumns.shift()
      }
      for(let i=0;i<this.quotesData.length;i++){
      for(let j=0;j<tableColumns.length;j++){
        if(this.quotesData[i][tableColumns[j]]!='')
        break;
        count++;
      }
      if(count < tableColumns.length)
      data.push(this.quotesData[i])
      count = 0
      }

      console.log(data)
      if(data.length == 0)
      localStorage.setItem("insurerData","")
      else
      localStorage.setItem("insurerData",JSON.stringify(data))
      alert("Quotes data submitted!!")
    }
  }

  getQuotesObj(){
    let quotesObj = {}
    let columns = [...this.displayedColumns]
    columns.shift()
    columns.map(item=>{quotesObj[item] = ''})
    return quotesObj
  }

  addRow(){
    let quotesObj = this.getQuotesObj()
    this.quotesData.push(quotesObj)
    this.dataSource = new MatTableDataSource(this.quotesData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    let lastPageItemsLength = this.paginator.getNumberOfPages() * this.paginator.pageSize
    if(this.quotesData.length-1 < lastPageItemsLength)
    this.paginator.pageIndex =  this.paginator.getNumberOfPages();
    else
    this.paginator.pageIndex =  this.paginator.getNumberOfPages() + 1;
  }

  removeExtraTabs(string:string){
    return string.replace(new RegExp("\t\t", 'g'), "\t");
  }
  generateTableData(excelData:string){
    //let data = this.removeExtraTabs(excelData)
    let rows = excelData.split('\n')
    rows.pop()
    console.log(rows)
    let excelDataArr = []
    for(let i=0;i<rows.length;i++){
      //rows[i] = this.removeExtraTabs(rows[i])
      let cells = rows[i].split("\t")
        if(cells.length!=this.displayedColumns.length-1)
        {
          alert("Please copy valid data!!")
          return;
        }
        let excelDataObj = this.getQuotesObj()
        let cellsIndex = 0
        for(let k=0;k<Object.keys(excelDataObj).length;k++){
          excelDataObj[Object.keys(excelDataObj)[k]] = cells[cellsIndex++];
        }
        excelDataArr.push(excelDataObj)
    }
    if(localStorage.insurerData)
    this.quotesData = [...this.quotesData,...excelDataArr]
    else
    this.quotesData = excelDataArr
    
    console.log(this.quotesData)
    this.dataSource = new MatTableDataSource(this.quotesData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.submitted = true
  }
  onPaste(event:ClipboardEvent){
    let clipboardData = event.clipboardData
    let parsedText = clipboardData.getData('text')
    console.log(parsedText)
    this.generateTableData(parsedText)
  }

  getFilterOptions(searchValue:string){
    let filterValue = searchValue.toLowerCase()
    this.filteredOptions = this.insurersList.filter(option => option.toLowerCase().indexOf(filterValue) === 0)

  }

  checkAutocompleteError(searchValue:string,formControl,index){
    let formControlName = formControl+index
    let filterValue = searchValue.toLowerCase()
    this.filteredOptions = this.insurersList.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
    if(this.filteredOptions.length == 0){
      this.autocompleteErrorObj[formControlName]= true
      return true
    }else{
      this.autocompleteErrorObj[formControlName]= false
    }
  }

  checkAutocompleteTooltip(searchValue:string){
    let filterValue = searchValue.toLowerCase()
    this.filteredOptions = this.insurersList.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
    if(this.filteredOptions.length == 0)
    return false
    else
    return true
  }

  clearFilterData(searchValue:string){
    if(searchValue == '')
    this.filteredOptions = this.insurersList
    else
    this.getFilterOptions(searchValue)
  }

  displayFn(user): string | undefined {
    return user ? user : undefined;
  }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    removeSelectedRows() {
  
      this.selection.selected.forEach(item => {
        let index: number = this.quotesData.findIndex(d => d === item);
        console.log(this.quotesData.findIndex(d => d === item));
        this.quotesData.splice(index,1)
        this.dataSource = new MatTableDataSource(this.quotesData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.selection = new SelectionModel(true, []);
    }

    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    checkError(quotesForm,formControl,index){
      let formControlName = formControl+index
      if(quotesForm.controls && quotesForm.controls[formControlName]){
        if(quotesForm.controls[formControlName].invalid && (this.submitted || quotesForm.controls[formControlName].dirty || quotesForm.controls[formControlName].touched) && quotesForm.controls[formControlName].errors){
          return true
        }else{
          return false
        }
      }
    }

    disableToolTip(quotesForm,formControl,index){
      let formControlName = formControl+index
      if(quotesForm.controls && quotesForm.controls[formControlName]){
        if(quotesForm.controls[formControlName].invalid && (this.submitted || quotesForm.controls[formControlName].dirty || quotesForm.controls[formControlName].touched) && quotesForm.controls[formControlName].errors){
          return false
        }else{
          return true
        }
      }
    }

    isNumberkey(event) : boolean{
        var charCode = (event.which) ? event.which : event.keyCode
        if(charCode == 46 && (event.target.value).indexOf('.')== -1)
        return true
        if (charCode > 31 && (charCode < 48 || charCode > 57))
           return false;

        return true;
     
      //return (/^\d*\.?\d*$/).test(value);
    }

   ngOnInit() {
     
    this.insurersList = ["Aviva","Canada Life","Ellipse","Generali","Havensrock","L&G","Lutine","Met Life","OmniLife","RAM","Sagicor","UNUM","Zurich"]
    this.filteredOptions = this.insurersList
    if(localStorage.insurerData)
    this.quotesData = JSON.parse(localStorage.insurerData)
    //show table empty rows if no quotes data present
    if(this.quotesData && this.quotesData.length==0){
      for(let i=0;i<5;i++){
        let quotesObj = this.getQuotesObj()
        this.quotesData.push(quotesObj)
      }
    }else{
      this.submitted = true
    }
    //this.data = Object.assign( this.quotesData);
    this.dataSource = new MatTableDataSource(this.quotesData);
    this.selection = new SelectionModel(true, []);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  
}
