import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CertificatetemplateviewPage } from './certificatetemplateview.page';

const routes: Routes = [
  {
    path: '',
    component: CertificatetemplateviewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificatetemplateviewPage]
})
export class CertificatetemplateviewPageModule {}
