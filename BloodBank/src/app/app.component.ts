import { Component } from '@angular/core';
import { MatList } from '@angular/material/list';
import {
  CdkDragStart,
  CdkDragMove,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem
} from '@angular/cdk/drag-drop';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  remaining_bottle: any;
  
  Resultfields: any[] = [];

  
  // BB repository
    Blood_bottles = 
    [
      { bg: 'A+', count: 2, className: 'Aplus' },
      { bg: 'B+', count: 5, className: 'Bplus' },
      { bg: 'AB+', count: 6, className: 'ABplus' },
      { bg: 'O+', count: 7, className: 'Oplus' },
      { bg: 'A-', count: 2, className: 'Aminus' },
      { bg: 'B-', count: 1, className: 'Bminus' },
      { bg: 'AB-', count: 2, className: 'ABminus' },
      { bg: 'O-', count: 2, className: 'Ominus' }
    ];


  // Get Selected Blood Group Using Select Option
    pos: number = 0;
    onChange(event: Event) {
      if ((event.target as HTMLInputElement).value === 'select') 
      {
        alert('select blood group properly');
      } 
      else 
      {
        let a = '.' + (event.target as HTMLInputElement).value;
        $(a).addClass('highlight');
        $(a)
          .parent()
          .siblings()
          .children()
          .removeClass('highlight');

        this.pos = this.Blood_bottles.map(function (e) {
          return e.className;
        }).indexOf((event.target as HTMLInputElement).value);
      }
    }

  // Get Selected Blood Group Bottles Using Select Option
    onChangenumberofbottles(event: Event) 
    {
      this.remaining_bottle = this.Blood_bottles[this.pos].count - parseInt((event.target as HTMLInputElement).value);
    }


  // Store the remaining bootles count in the repository of slected blood group 
    Store_Remaining_bottle() 
    {
      this.Blood_bottles[this.pos].count = this.remaining_bottle;
    }
  
  
  // Angular material CDKDropList library to use drop and drag functionality.
    drop(event: CdkDragDrop<any[]>) 
    {
      this.Resultfields = [];
      this.addField(event.item.data, event.currentIndex);
    }

  
  selected_Blood_Bootle : number = 0;
  // push the selected data to new array Resultfields  
    addField(fieldType: any, index: number) 
    {
      this.selected_Blood_Bootle = this.Blood_bottles[this.pos].count - this.remaining_bottle;
      this.Resultfields.push(fieldType);

      // call function to get remaining bottles in the repository.
      this.Store_Remaining_bottle()
    }
}
