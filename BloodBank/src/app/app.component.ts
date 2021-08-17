import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  boxStyle : boolean = true;

  title = 'BloodBank';
  Blood_bottles = [ 
    { bg:'A+', count:'2' , className:'Aplus'},
    { bg:'B+', count:'5' , className:'Bplus'},
    { bg:'AB+', count:'6' , className:'ABplus'},
    { bg:'O+', count:'7' , className:'Oplus'},
    { bg:'A-', count:'2' , className:'Aminus'}, 
    { bg:'B-', count:'1' , className:'Bminus'},
    { bg:'AB-', count:'2' , className:'ABminus'},
    { bg:'O-', count:'2' , className:'Ominus'},
  ];

  // Blood_bottles = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ];

  onChange(event:Event) 
  {
    let a = "." + (event.target as HTMLInputElement).value
    $(a).addClass("highlight");
    $(a).parent().siblings().children().removeClass("highlight");

  }
}
