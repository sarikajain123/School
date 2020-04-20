import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalarytemplateviewPage } from './salarytemplateview.page';

const routes: Routes = [
  {
    path: '',
    component: SalarytemplateviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalarytemplateviewPage]
})
export class SalarytemplateviewPageModule {}
