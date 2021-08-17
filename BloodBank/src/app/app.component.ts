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
  // @ViewChild(MatList, { read: ElementRef }) 
  // child: any = ElementRef;

  // _currentIndex : any;
  // _currentField : any;

  // Blood_bottles = ['boolean', 'string', 'text', 'user'];

  // fields: string[] = [];
  // boxStyle : boolean = true;

  title = 'BloodBank';
  Blood_bottles = [ 
    { bg:'A+', count:2 , className:'Aplus'},
    { bg:'B+', count:5 , className:'Bplus'},
    { bg:'AB+', count:6 , className:'ABplus'},
    { bg:'O+', count:7 , className:'Oplus'},
    { bg:'A-', count:2 , className:'Aminus'}, 
    { bg:'B-', count:1 , className:'Bminus'},
    { bg:'AB-', count:2 , className:'ABminus'},
    { bg:'O-', count:2 , className:'Ominus'},
  ];

  // Blood_bottles = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ];
  pos : number = 0;
  onChange(event:Event) 
  {
    let a = "." + (event.target as HTMLInputElement).value
    $(a).addClass("highlight");
    $(a).parent().siblings().children().removeClass("highlight");
    const found = this.Blood_bottles.some(el => el.className === (event.target as HTMLInputElement).value);
    console.log(found)
    this.pos = this.Blood_bottles.map(function (e) {
      return e.className;
    }).indexOf((event.target as HTMLInputElement).value);
  }
  onChangenumberofbottles(event : Event)
  {
    let remaining_bottle =  this.Blood_bottles[this.pos].count - parseInt((event.target as HTMLInputElement).value) ;
    console.log("remaining_bottle = " + remaining_bottle)
    this.Blood_bottles[this.pos].count = remaining_bottle;
  }


  // dragStart(event: Event) {
  //   this._currentIndex = this.Blood_bottles[0].bg.indexOf(
  //     (event.target as HTMLInputElement).value
  //   );
  //   // Get index of dragged type
  //   this._currentField = this.child.nativeElement.children[this._currentIndex];
  //   // Store HTML field
  // }

  // moved(event: Event) {
  //   // Check if stored HTML field is as same as current field
  //   if (
  //     this.child.nativeElement.children[this._currentIndex] !==
  //     this._currentField
  //   ) {
  //     // Replace current field, basically replaces placeholder with old HTML content
  //     this.child.nativeElement.replaceChild(
  //       this._currentField,
  //       this.child.nativeElement.children[this._currentIndex]
  //     );
  //   }
  // }

  // itemDropped(event: CdkDragDrop<any[]>) {
  //   this.fields = [];
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
  //   } else {
  //     this.addField(event.item.data, event.currentIndex);
  //   }
  // }

  // addField(fieldType: string, index: number) {
  //   this.fields.splice(index, 0, fieldType);
  // }
}
