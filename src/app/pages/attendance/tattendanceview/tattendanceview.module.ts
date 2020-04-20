import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TattendanceviewPage } from './tattendanceview.page';

const routes: Routes = [
  {
    path: '',
    component: TattendanceviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TattendanceviewPage]
})
export class TattendanceviewPageModule {}
