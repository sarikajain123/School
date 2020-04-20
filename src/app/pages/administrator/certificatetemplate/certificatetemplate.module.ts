import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CertificatetemplatePage } from './certificatetemplate.page';

const routes: Routes = [
  {
    path: '',
    component: CertificatetemplatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificatetemplatePage]
})
export class CertificatetemplatePageModule {}
