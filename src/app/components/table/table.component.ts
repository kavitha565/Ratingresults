import {SelectionModel} from '@angular/cdk/collections';
import {Component,OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',position1: 1, name1: 'Hydrogen', weight1: 1.0079, symbol1: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',position1: 2, name1: 'Helium', weight1: 4.0026, symbol1: 'He',},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',position1: 5, name1: 'Boron', weight1: 10.811, symbol1: 'B'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol','position1', 'name1', 'weight1', 'symbol1'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
