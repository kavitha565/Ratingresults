import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {
  pasteData 
  tableData:Array<object> = []
  constructor(private cs:CommonServiceService,private eleRef:ElementRef) { }

  removeExtraTabs(string:string){
    return string.replace(new RegExp("\t\t", 'g'), "\t");
  }
  generateTableData(excelData:string){
    let data = this.removeExtraTabs(excelData)
    let rows = data.split('\n')
    rows.pop()
    console.log(rows)
    for(let i=0;i<rows.length;i++){
      rows[i] = this.removeExtraTabs(rows[i])
      let cells = rows[i].split("\t")
        // let excelDataObj = {
        //   name : "",
        //   age : "",
        //   company : ""
        // }
        let excelDataObj = {
          empId : "",
          namePrefix : "",
          firstName : "",
          middleName : "",
          lastName : "",
          gender : "",
          email : "",
          dob : "",
          doj : ""
        }
        let cellsIndex = 0
        for(let k=0;k<Object.keys(excelDataObj).length;k++){
          excelDataObj[Object.keys(excelDataObj)[k]] = cells[cellsIndex++];
        }
        this.tableData.push(excelDataObj)
    }
    console.log(this.tableData);
    //clear textarea data
    // setTimeout(()=>{
    //   this.pasteData = ''
    // },1000)

  }
  onPaste(event:ClipboardEvent){
    let clipboardData = event.clipboardData
    let parsedText = clipboardData.getData('text')
    console.log(parsedText)
    this.generateTableData(parsedText)
  }

  onSubmit(){

    //store excel data to localstorage
    localStorage.setItem("excelData",JSON.stringify(this.tableData))
    alert("Data added successfully!!")
    // this.cs.postExcelDataService(this.tableData)
    //   .subscribe((res:any)=>{
    //     if(res.status == 200){
    //       alert(res.message)
    //     }
    //   },(err)=>{
    //     console.log("Something went wrong,Please try again!!");
    //     alert("Something went wrong,Please try again!!")
    //   })
  }

  showEditable(event,editableField){
    event.target.hidden = true
    //console.log(this.eleRef.nativeElement.getElementsByClassName(editableField))
    this.eleRef.nativeElement.getElementsByClassName(editableField)[0].hidden = false
    //alert('hide hide')
  }
  ngOnInit() {
    
    // document.addEventListener('paste',function(e){
    //   console.log("clipboard data",+e.clipboardData.getData('text'))
      
    // })

    //get Localstorage data
    if(localStorage.excelData)
    this.tableData = JSON.parse(localStorage.excelData);

  }
}
