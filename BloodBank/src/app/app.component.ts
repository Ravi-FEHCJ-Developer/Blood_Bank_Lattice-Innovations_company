import { Component, OnInit } from '@angular/core';
import { MatList } from '@angular/material/list';
import {
  CdkDragStart,
  CdkDragDrop
} from '@angular/cdk/drag-drop';
import {  NgForm, NgModel } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  
  ngOnInit() 
  {
    if(this.Blood_bottles.length === 0)
    {
      $(document).ready(function(){
        $(".userform").css("display", "none");
      });
    }
  }


  // remaining bottle 
  remaining_bottle: any;
  
  // Result store array
  Resultfields: any[] = [];

  // Bottle Counter
  select_bootles : any[] = [];

  // newRepo: any[]=[]

  // getbg : string = ""
  
  // BB repository
  Blood_bottles : any[] = [];

  CreateRepository(form:NgForm)
  {
    let splitedData = form.value.bloodgroup.split(' ');
    const NewData = 
    {
      bg : splitedData[0],
      count : form.value.bloodgroupbootle,
      className : splitedData[1]
    }
    this.Blood_bottles.push(NewData);
    $(document).ready(function(){
      $(".userform").css("display", "block");
    });  
  }  
  

  // Get Selected Blood Group Using Select Option
    pos: number = 0;
    onChange(event: Event) 
    {
      if ((event.target as HTMLInputElement).value === 'Select') 
      {
        alert('select blood group properly');
      } 
      else 
      {
        let a = '.' + (event.target as HTMLInputElement).value;
        $(a).addClass('highlight');
        $(a).parent().siblings().children().removeClass('highlight');
  
        // get the position of blood group            
        // map gets all the classname and indexof find the index of reuired classname 
        this.pos = this.Blood_bottles.map(function (e) 
        {
          return e.className;
        }).indexOf((event.target as HTMLInputElement).value);

      }

        // Bottle Counter
        this.bottlecounter(this.Blood_bottles[this.pos].count);
    }



    // show nmbr of bootles a blood group have
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
        if ((event.target as HTMLInputElement).value === 'Select') 
        {
          alert('select Number of Bottles properly');
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
        this.addField(event.item.data);
      }

  
  selected_Blood_Bootle : number = 0;
  // push the selected data to new array Resultfields  
    addField(fieldType: any) 
    {
      this.selected_Blood_Bootle = this.Blood_bottles[this.pos].count - this.remaining_bottle;
      this.Resultfields.push(fieldType);

      // call function to get remaining bottles in the repository.
      this.Store_Remaining_bottle()
    }
}
