import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
  tableColumns: string[] = ["insurer",	"quoteRequested",	"quoteDeclined", "reasonForDecline",	"spCosted",	"unitRate","premium","percentage","freeCoverLevel","singleEventMaximum","otherNotes"];
  //displayedColumns: string[] = ["insurer",	"quoteRequested",	"quoteDeclined", "reasonForDecline",	"spCosted",	"unitRate","premium","percentageChangeInExpiringUnitRate","freeCoverLevel","singleEventMaxium","otherNotes","timeofExport","expiringUnitRate","client","schemeName","product","reviewMembership","existingBasis","basisNumber","basisDescription","round"];
  

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  checkAutoCompleteValidation(){
    if(this.autocompleteErrorObj && Object.keys(this.autocompleteErrorObj).length>0){
      let validationArr = Object.values(this.autocompleteErrorObj)
      return validationArr.includes(true)
    }else{
      return false
    }
  }

  checkFormLevelValidation(formName,value){
        if(!this.insurersList.includes(value))
        return true
  }

  checkValidation(){
    for(let i=0;i<this.quotesData.length;i++){
      if(this.quotesData[i]["insurer"]!='' && this.checkFormLevelValidation('insurer',this.quotesData[i]["insurer"])){
        document.getElementById("insurer"+i).scrollIntoView()
        return true
      }
    }
    return false
  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
  }

  submitData(quotesForm){
    
    //check form is modified or not
    // if(!quotesForm.dirty){
    //   alert("No changes are detected!!")
    //   return;
    // }
    
    //check validation manually
    // if(this.checkValidation())
    // alert("Please clear errors!!")

    //check validation
    if(quotesForm.invalid || this.checkValidation()){
      if(document.getElementsByClassName("ng-invalid") && document.getElementsByClassName("ng-invalid").length>1){
        //if(!this.isElementInViewport(document.getElementsByClassName("ng-invalid")[1]))
        document.getElementsByClassName("ng-invalid")[1].scrollIntoView({
          block : 'center'
        })
      }
      alert("Please clear errors!!")
    }
    else{
      let count = 0
      let data = []

      for(let i=0;i<this.quotesData.length;i++){
      for(let j=0;j<this.tableColumns.length;j++){
        if(this.quotesData[i][this.tableColumns[j]]!='')
        break;
        count++;
      }
      if(count < this.tableColumns.length)
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
    this.tableColumns.map(item=>{quotesObj[item] = ''})
    return quotesObj
  }

  addRow(){
    let quotesObj = this.getQuotesObj()
    this.quotesData.push(quotesObj)
    this.dataSource = new MatTableDataSource(this.quotesData);
    this.dataSource.sort = this.sort;
    
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
        if(cells.length!=this.tableColumns.length)
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

    //check whether row is empty or not
      let count = 0
      let data  = []
      for(let i=0;i<this.quotesData.length;i++){
        for(let j=0;j<this.tableColumns.length;j++){
          if(this.quotesData[i][this.tableColumns[j]]!='')
          break;
          count++;
        }
        if(count < this.tableColumns.length)
        data.push(this.quotesData[i])
        count = 0
        }
    if(data.length == 0)
    this.quotesData = excelDataArr
    else
    this.quotesData = [...data,...excelDataArr]

    // if(localStorage.insurerData)
    // this.quotesData = [...this.quotesData,...excelDataArr]
    // else
    // this.quotesData = excelDataArr
    
    console.log(this.quotesData)
    this.dataSource = new MatTableDataSource(this.quotesData);
    this.dataSource.sort = this.sort;
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

  focusOutFunction(searchValue:string,event){
    let formControlId = event.target.id
    //let filterValue = searchValue.toLowerCase()
    if(!this.insurersList.includes(searchValue)){
      document.getElementById(formControlId).classList.add("errorDiv")
    }else{
      document.getElementById(formControlId).classList.remove("errorDiv")
    }
  }

  // onSelectAutocomplete(event){
  //   event.target.classList.remove("errorDiv")
  //   //alert("selected!")
  // }

  checkAutocompleteError(searchValue:string){
    let filterValue = searchValue.toLowerCase()
    this.filteredOptions = this.insurersList.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
    if(this.filteredOptions.length == 0)
    return true
    else
    return false
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
    }

   ngOnInit() {
     
    this.insurersList = ["Aviva","Canada Life","Ellipse","Generali","Havensrock","L&G","Lutine","Met Life","OmniLife","RAM","Sagicor","UNUM","Zurich"]
    this.filteredOptions = this.insurersList
    if(localStorage.insurerData)
    this.quotesData = JSON.parse(localStorage.insurerData)
    //show table empty rows if no quotes data present
    if(this.quotesData && this.quotesData.length==0){
      for(let i=0;i<10;i++){
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
  }
  
  
}
