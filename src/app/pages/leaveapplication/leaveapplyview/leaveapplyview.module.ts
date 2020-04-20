import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaveapplyviewPage } from './leaveapplyview.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveapplyviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaveapplyviewPage]
})
export class LeaveapplyviewPageModule {}
