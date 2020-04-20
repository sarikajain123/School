import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssetassignmentPage } from './assetassignment.page';

const routes: Routes = [
  {
    path: '',
    component: AssetassignmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssetassignmentPage]
})
export class AssetassignmentPageModule {}
