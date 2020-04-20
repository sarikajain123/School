import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UattendanceviewPage } from './uattendanceview.page';

const routes: Routes = [
  {
    path: '',
    component: UattendanceviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UattendanceviewPage]
})
export class UattendanceviewPageModule {}
