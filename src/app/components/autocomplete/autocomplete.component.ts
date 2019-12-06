import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  options  = ["Aviva","Canada Life","Ellipse","Generali","Havensrock","L&G","Lutine","Met Life","OmniLife","RAM","Sagicor","UNUM","Zurich"]
  filteredOptions;
  selectedOpt1
  selectedOpt2 
  error1
  error2

  getFilterOptions(searchValue:string){
    let filterValue = searchValue.toLowerCase()
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  

  }

  ngOnInit() {
    this.filteredOptions = this.options
  }

  displayFn(user): string | undefined {
    return user ? user : undefined;
  }

}
