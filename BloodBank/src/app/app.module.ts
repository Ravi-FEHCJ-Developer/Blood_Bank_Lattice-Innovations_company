import {  BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';

import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  AppComponent } from './app.component';

import {  DragDropModule } from '@angular/cdk/drag-drop';
import {  MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  exports: [
    // cdk
    DragDropModule,
    // Material
    MatListModule,
    // select option
    MatSelectModule
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}