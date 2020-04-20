import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';



import { IonicModule } from '@ionic/angular';

import { SattendanceaddPage } from './sattendanceadd.page';

const routes: Routes = [
  {
    path: '',
    component: SattendanceaddPage
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
  declarations: [SattendanceaddPage]
})
export class SattendanceaddPageModule {}
