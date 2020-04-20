import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MailandsmstemplateviewPage } from './mailandsmstemplateview.page';

const routes: Routes = [
  {
    path: '',
    component: MailandsmstemplateviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MailandsmstemplateviewPage]
})
export class MailandsmstemplateviewPageModule {}
