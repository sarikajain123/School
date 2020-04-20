import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HourlytemplatePage } from './hourlytemplate.page';

const routes: Routes = [
  {
    path: '',
    component: HourlytemplatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HourlytemplatePage]
})
export class HourlytemplatePageModule {}
