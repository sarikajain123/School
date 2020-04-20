import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductpurchasesviewPage } from './productpurchasesview.page';

const routes: Routes = [
  {
    path: '',
    component: ProductpurchasesviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductpurchasesviewPage]
})
export class ProductpurchasesviewPageModule {}
