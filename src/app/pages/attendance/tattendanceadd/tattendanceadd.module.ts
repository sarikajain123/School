import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TattendanceaddPage } from './tattendanceadd.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';


const routes: Routes = [
  {
    path: '',
    component: TattendanceaddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      Ionic4DatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TattendanceaddPage]
})
export class TattendanceaddPageModule {}
