import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild(MatList, { read: ElementRef }) child: ElementRef | any;

  _currentIndex : any;
  _currentField : any;

  remaining_bottle: any;

  Blood_bottles = [
    { bg: 'A+', count: 2, className: 'Aplus' },
    { bg: 'B+', count: 5, className: 'Bplus' },
    { bg: 'AB+', count: 6, className: 'ABplus' },
    { bg: 'O+', count: 7, className: 'Oplus' },
    { bg: 'A-', count: 2, className: 'Aminus' },
    { bg: 'B-', count: 1, className: 'Bminus' },
    { bg: 'AB-', count: 2, className: 'ABminus' },
    { bg: 'O-', count: 2, className: 'Ominus' }
  ];

  pos: number = 0;
  onChange(event: Event) {
    if ((event.target as HTMLInputElement).value === 'select') {
      alert('select blood group properly');
    } else {
      let a = '.' + (event.target as HTMLInputElement).value;
      $(a).addClass('highlight');
      $(a)
        .parent()
        .siblings()
        .children()
        .removeClass('highlight');
      const found = this.Blood_bottles.some(
        el => el.className === (event.target as HTMLInputElement).value
      );
      // console.log(found);
      this.pos = this.Blood_bottles.map(function(e) {
        return e.className;
      }).indexOf((event.target as HTMLInputElement).value);
    }
  }
  onChangenumberofbottles(event: Event) {
    this.remaining_bottle =
      this.Blood_bottles[this.pos].count -
      parseInt((event.target as HTMLInputElement).value);
    // console.log('remaining_bottle = ' + this.remaining_bottle);
  }

  Store_Remaining_bottle() {
    this.Blood_bottles[this.pos].count = this.remaining_bottle;
  }

  fields : any[] = [];

  dragStart(event: CdkDragStart) 
  {
    console.log("pick up")
    this._currentIndex = this.Blood_bottles.indexOf(event.source.data); // Get index of dragged type
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
  }

  moved(event: CdkDragMove) 
  {
    console.log("moving")
    // Check if stored HTML field is as same as current field
    if (
      this.child.nativeElement.children[this._currentIndex] !==
      this._currentField
    ) {
      // Replace current field, basically replaces placeholder with old HTML content
      this.child.nativeElement.replaceChild(
        this._currentField,
        this.child.nativeElement.children[this._currentIndex]
      );
    }
  }

  drop(event: CdkDragDrop<any[]>) 
  {
    this.fields = [];
    if (event.previousContainer === event.container) 
    {
      console.log("IF dropped")
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      console.log("ELSE dropped")
      console.log(event.item.data)
      console.log(event.currentIndex)
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(fieldType: any, index: number) 
  {
    console.log("adding")
    this.fields.splice(index, 0, fieldType);
    this.Store_Remaining_bottle();
  }
}
