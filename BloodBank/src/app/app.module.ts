import {  BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';

import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  AppComponent } from './app.component';

import {  DragDropModule } from '@angular/cdk/drag-drop';
import {  FormsModule } from '@angular/forms';  
import {  MatButtonModule } from '@angular/material/button';
import {  MatSelectModule } from '@angular/material/select';
import {  MatDividerModule  } from '@angular/material/divider';


@NgModule({
  exports: [
    // cdk
    DragDropModule
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    BrowserAnimationsModule
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}