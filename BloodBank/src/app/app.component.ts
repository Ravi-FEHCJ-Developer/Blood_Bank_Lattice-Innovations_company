import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatList } from '@angular/material/list';
import {  CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  @ViewChild(MatList, { read: ElementRef }) child: ElementRef;

  _currentIndex: any;
  _currentField: any;

  fields: string[] = [];
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
    console.log(found);
    this.pos = this.Blood_bottles.map(function(e) {
      return e.className;
    }).indexOf((event.target as HTMLInputElement).value);
  }
  onChangenumberofbottles(event: Event) {
    this.remaining_bottle =
      this.Blood_bottles[this.pos].count -
      parseInt((event.target as HTMLInputElement).value);
    console.log('remaining_bottle = ' + this.remaining_bottle);
  }

  Store_Remaining_bottle() {
    this.Blood_bottles[this.pos].count = this.remaining_bottle;
  }

  dragStart(event: CdkDragStart) {
    // console.log(event.source.data)
    this._currentIndex = this.Blood_bottles.indexOf(event.source.data); // Get index of dragged type
    // console.log(this._currentIndex)
    this._currentField = this.child.nativeElement.children[event.source.data]; // Store HTML field
    console.log(this._currentField);
  }

  moved(event: CdkDragMove) {
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

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
      console.log(event.previousIndex)
      console.log(event.currentIndex)
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
    this.Store_Remaining_bottle();
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType);
  }
}

