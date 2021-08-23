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

  // remaining bottle 
  remaining_bottle: any;
  
  // Result store array
  Resultfields: any[] = [];

  // Bottle Counter
  select_bootles : any[] = [];

  
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

        // Bottle Counter
        this.bottlecounter(this.Blood_bottles[this.pos].count);
      }

      bottlecounter(select_bootles:number)
      {
        for(let i = 1; i <= select_bootles; i++)
        {
          this.select_bootles.push(i);
        }
      }
      
    // Get Selected Blood Group Bottles Using Select Option
      onChangenumberofbottles(event: Event) 
      {
        if( parseInt((event.target as HTMLInputElement).value) < 1 || parseInt((event.target as HTMLInputElement).value) > this.Blood_bottles[this.pos].count )
        {
          alert( this.Blood_bottles[this.pos].bg + " Blood Group has only " + this.Blood_bottles[this.pos].count +  " number of bottles in Blood Bank" );
        }
        else
        {
          this.remaining_bottle = this.Blood_bottles[this.pos].count - parseInt((event.target as HTMLInputElement).value);
        }
        
      }
      
      
    // Store the remaining bootles count in the repository of slected blood group 
      Store_Remaining_bottle() 
      {
        this.Blood_bottles[this.pos].count = this.remaining_bottle;
      }
      
      
      dragStart(event: CdkDragStart) 
      {
        $(".bucket").addClass('bucket_shadow');
        $(".hiden h2").addClass('drag_text');
      }
      
      
      
    // Angular material CDKDropList library to use drop and drag functionality.
      drop(event: CdkDragDrop<any[]>) 
      {
        this.Resultfields = [];
        $(".bucket").removeClass('bucket_shadow');
        $(".hiden h2").removeClass('drag_text');
        $(".hiden h2").addClass('drop_text');
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
