import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaveapplicationviewPage } from './leaveapplicationview.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveapplicationviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaveapplicationviewPage]
})
export class LeaveapplicationviewPageModule {}
