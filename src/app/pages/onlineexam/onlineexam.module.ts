import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnlineexamPage } from './onlineexam.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineexamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnlineexamPage]
})
export class OnlineexamPageModule {}
