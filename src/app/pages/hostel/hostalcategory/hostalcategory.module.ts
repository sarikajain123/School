import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HostalcategoryPage } from './hostalcategory.page';

const routes: Routes = [
  {
    path: '',
    component: HostalcategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HostalcategoryPage]
})
export class HostalcategoryPageModule {}
