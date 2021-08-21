import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatListModule
} from '@angular/material/list';
import {AppComponent} from './app.component';

@NgModule({
  exports: [
    // cdk
  DragDropModule,
    // Material
    MatListModule
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