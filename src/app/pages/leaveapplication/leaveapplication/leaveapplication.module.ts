import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaveapplicationPage } from './leaveapplication.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveapplicationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaveapplicationPage]
})
export class LeaveapplicationPageModule {}
