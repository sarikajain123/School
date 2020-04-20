import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SystemadminviewPage } from './systemadminview.page';

const routes: Routes = [
  {
    path: '',
    component: SystemadminviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SystemadminviewPage]
})
export class SystemadminviewPageModule {}
