import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisitorinfoviewPage } from './visitorinfoview.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorinfoviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisitorinfoviewPage]
})
export class VisitorinfoviewPageModule {}
