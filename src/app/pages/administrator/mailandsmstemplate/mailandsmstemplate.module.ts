import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MailandsmstemplatePage } from './mailandsmstemplate.page';

const routes: Routes = [
  {
    path: '',
    component: MailandsmstemplatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MailandsmstemplatePage]
})
export class MailandsmstemplatePageModule {}
