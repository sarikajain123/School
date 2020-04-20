import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MarkdistributionPage } from './markdistribution.page';

const routes: Routes = [
  {
    path: '',
    component: MarkdistributionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MarkdistributionPage]
})
export class MarkdistributionPageModule {}
